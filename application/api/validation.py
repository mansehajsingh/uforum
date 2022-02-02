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
        if len(self.full_name) > 100:
            return False # very very unlikely of a full name over 100 characters
        return True

    def is_valid(self):
        return self.__username_is_valid() and self.__password_is_valid() and self.__full_name_is_valid()

    