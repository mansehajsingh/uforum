import types

class UserValidator:

    def __init__(self, username, full_name, password):
        self.username = username
        self.full_name = full_name
        self.password = password

    def __username_is_valid(self):
        if len(self.username) < 4 or len(self.username) > 20:
            return False # if it is not between 4-20 characters inclusive
        elif (not self.username.replace("_", "").isalnum()) and (not self.username.isascii()):
            return False # if it is not alphanumeric + underscores and ascii
        return True

    def __password_is_valid(self):
        if len(self.password) < 4 or len(self.password) > 30:
            return False # if it is not between 4-30 characters inclusive
        return True

    def __full_name_is_valid(self):
        if len(self.full_name) > 30:
            return False 
        return True

    def is_valid(self):
        return self.__username_is_valid() and self.__password_is_valid() and self.__full_name_is_valid()


class CommunityValidator:

    def __init__(self, name, description):
        self.name = name
        self.description = description
    
    def __name_is_valid(self):
        if len(self.name) > 30 or len(self.name) == 0:
            return False
        return True
    
    def __description_is_valid(self):
        if len(self.description) > 140:
            return False
        return True
    
    def is_valid(self):
        return self.__name_is_valid() and self.__description_is_valid()


class PostValidator:

    def __init__(self, title, content, is_anonymous):
        self.title = title
        self.content = content
        self.is_anonymous = is_anonymous
    
    def __title_is_valid(self):
        if len(self.title) < 50:
            return True 
        return False
    
    def __content_is_valid(self):
        if len(self.content) < 500:
            return True
        return False
    
    def __is_anonymous_is_valid(self):
        return type(self.is_anonymous) == bool

    def is_valid(self):
        return self.__title_is_valid() and \
               self.__content_is_valid() and \
               self.__is_anonymous_is_valid()