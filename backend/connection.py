class DatabaseConnections:
   @staticmethod
   def get_user_connection(db_connection):
      return db_connection['users']
   
   @staticmethod
   def get_user_details_connection(db_connection):
      return db_connection['user_details']
      