from django.shortcuts import render
from django.db.models import Prefetch
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .auth import create_session, delete_session, is_valid_login, require_auth, lookup_session
import uuid

from .models import *
from .serializers import *
 
from . import constants
from .validation import *
from .utils import parse_json, hash_password

# Create your views here.

@api_view(["GET"])
def base(request, format=constants.DEFAULT_REQUEST_FORMAT):
    return Response(constants.API_ROUTES, status.HTTP_200_OK)


@api_view(["POST"])
def create_user(request, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body) # request.body is originally bytes

    try:
        if UserValidator(body["username"], body["full_name"], body["password"]).is_valid(): # if one or more fields are invalid
            try:
                User.objects.get(pk=body["username"])
            except User.DoesNotExist: # if username doesn't exist
                new_user = User(
                    username=body["username"],
                    full_name=body["full_name"],
                    password=hash_password(body["password"])
                )
                new_user.save() # execute the INSERT statement

                return Response(status=status.HTTP_200_OK)
            
            return Response(status=status.HTTP_409_CONFLICT) # 409 conflict between provided username and existing username

        else:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY) # 422 for invalid input that is not malformed syntactically

    except KeyError: # if the user data did not possess the necessary keys
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body)

    if "username" in body and "password" in body:
        if is_valid_login(body["username"], body["password"]) == True:
            session_details = create_session(body["username"])
            return Response(session_details, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED) # username and password details invalid

    else: # if the user data did not possess the necessary keys
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def logout(request, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body)

    if (
        "session" in body and 
        "username" in body["session"] and
        "session_id" in body["session"]
    ):
        delete_session(username=body["session"]["username"])
        return Response(status=status.HTTP_200_OK)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST) # if the required fields were not contained



@api_view(["POST"])
@require_auth
def create_community(request, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body)

    if "name" in body and "description" in body:

        if not CommunityValidator(body["name"], body["description"]).is_valid(): 
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        community_id = None
        while True: # finds a unique community id
            community_id = uuid.uuid4().hex
            if not Community.objects.filter(community_id=community_id).exists(): break

        new_community = Community( # creates the community
            community_id=community_id, 
            owner=User.objects.get(username=body["session"]["username"]),
            name=body["name"],
            description=body["description"]
        )
        new_community.save()

        new_community_join = CommunityJoin( # sets user as the owner of the community
            username=User.objects.get(username=body["session"]["username"]), 
            community_id=Community.objects.get(community_id=community_id),
            join_type=constants.JoinTypes.OWNER
        )
        new_community_join.save()

        return Response(status=status.HTTP_200_OK)
        
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@require_auth
def get_communities(request, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body)

    query_set = CommunityJoin.objects.filter(username=body["session"]["username"]) \
                .prefetch_related(Prefetch("community_id", to_attr="community"))

    response = CommunityOverviewSerializer(instance=query_set, many=True).data

    return Response(response, status=status.HTTP_200_OK)


@api_view(["POST"])
@require_auth
def get_community(request, community_id, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body)

    if Community.objects.filter(community_id=community_id).exists(): # confirming that the community exists

        if CommunityJoin.objects.filter(
            username=body["session"]["username"], 
            community_id=community_id
        ).exists(): # confirming that the user is authorized to access the community info
            query_set = Community.objects.get(community_id=community_id)
            response = CommunitySerializer(instance=query_set).data

            return Response(response, status=status.HTTP_200_OK)
        
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@require_auth
def get_posts(request, community_id, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body)

    if Community.objects.filter(community_id=community_id).exists(): # confirming the community exists
        if CommunityJoin.objects.filter(username=body["session"]["username"], community_id=community_id) \
            .exists(): # confirming that the user is authorized to access the community posts
            
            query_set = Post.objects.filter(community_id=community_id)
            response = PostSerializer(instance=query_set, many=True)

            return Response(response, status=status.HTTP_200_OK)
        
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@require_auth
def create_post(request, community_id, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body)

    if not Community.objects.filter(community_id=community_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND) # ensuring that the community exists

    if not CommunityJoin.objects.filter(
        username=body["session"]["username"],
        community_id=community_id
    ).exists():
        return Response(status=status.HTTP_401_UNAUTHORIZED) # confirming that the user has access to the community

    if "title" in body and \
       "content" in body and \
       "post_type" in body and \
       "is_anonymous" in body:

        if not PostValidator(
           body["title"], 
           body["content"], 
           body["post_type"],
           body["is_anonymous"]
        ).is_valid():
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY) # custom validation scheme
        
        post_id = None
        while True: # finds a unique post id
            post_id = uuid.uuid4().hex
            if not Post.objects.filter(post_id=post_id).exists(): break

        query_set = Community.objects.get(community_id=community_id)
        community_obj = CommunitySerializer(instance=query_set).data

        index = community_obj["indices"] + 1 # creates the next index of the object

        Community.objects.filter(community_id=community_id).update(indices=(index))

        new_post = Post(
            post_id=post_id,
            community=Community.objects.get(community_id=community_id),
            author=User.objects.get(username=body["session"]["username"]),
            index=index,
            title=body["title"],
            content=body["content"],
            post_type=body["post_type"],
            is_anonymous=body["is_anonymous"]
        )

        new_post.save()

        return Response(status=status.HTTP_200_OK)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@require_auth
def get_community_users(request, community_id, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body)

    if not CommunityJoin.objects.filter(username=body["session"]["username"], community_id=community_id).exists():
        return Response(status=status.HTTP_403_FORBIDDEN) # if the user is not registered to this community

    query_set = CommunityJoin.objects.filter(community_id=community_id)
    response = CommunityJoinSerializer(instance=query_set, many=True).data

    return Response(response, status=status.HTTP_200_OK)


@api_view(["POST"])
@require_auth
def delete_post(request, community_id, post_id, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body)

    if not Post.objects.filter(post_id=post_id).exists() \
       or Community.objects.filter(community_id=community_id).exists(): # if the post or community doesn
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if Post.objects.filter(post_id=post_id, author=body["session"]["username"]).exists(): # if the deleting user is the author
        Post.objects.filter(post_id=post_id, author=body["session"]["username"]).delete()
        return Response(status=status.HTTP_200_OK)

    elif CommunityJoin.objects.filter(
        community_id=community_id,
        username=body["session"]["username"],
        join_type=constants.JoinTypes.OWNER
    ).exists(): # if the deleting user is an owner of the community
        Post.objects.filter(post_id=post_id, author=body["session"]["username"]).delete()
        return Response(status=status.HTTP_200_OK)

    elif CommunityJoin.objects.filter(
        community_id=community_id,
        username=body["session"]["username"],
        join_type=constants.JoinTypes.CURATED
    ).exists(): # if the deleting user is a curator of the community
        Post.objects.filter(post_id=post_id, author=body["session"]["username"]).delete()
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_403_FORBIDDEN)
    