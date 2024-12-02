from backend.connection import DatabaseConnections
from backend.constants import HTTP_RESPONSE
from backend.startup import init_db_connection
import bcrypt
import gridfs

db_connection = init_db_connection()

class Helper:
   @staticmethod
   def is_user_present(email, conn=None):
      try:
         if conn is None:
            conn = DatabaseConnections.get_user_connection(db_connection)
         
         result = conn.find({"email": email.lower()})
         if not result:
            return True
         return False
      except Exception as e:
         raise e
   
   @staticmethod
   def get_user(email, conn=None):
      try:
         if conn is None:
            conn = DatabaseConnections.get_user_connection(db_connection)
         
         result = conn.find_one({"email": email.lower()})
         return result
      except Exception as e:
         raise e
   
   @staticmethod
   def create_new_user(email, hashed_password, username, conn=None):
      try:
         if conn is None:
            conn = DatabaseConnections.get_user_connection(db_connection)
         
         user = {
            "email": email.lower(),
            "password": hashed_password,
            "username": username
         }
         conn.insert_one(user)
      except Exception as e:
         raise e
   
   @staticmethod
   def authenticate_user(email, password, conn=None):
      try:
         if conn is None:
            conn = DatabaseConnections.get_user_connection(db_connection)
         
         if not Helper.is_user_present(email=email):
            return HTTP_RESPONSE.NOT_FOUND
         
         result = conn.find_one({"email": email.lower()})
         hashed_password = result["password"]
         
         if Helper.verify_password(password=password, hashed_password=hashed_password):
            return HTTP_RESPONSE.OK
         
         return HTTP_RESPONSE.UNAUTHORIZED
      except Exception as e:
         raise e
   
   @staticmethod
   def get_hashed_password(password: str) -> str:
      hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
      return hashed.decode('utf-8')
   
   @staticmethod
   def verify_password(password: str, hashed_password: str) -> bool:
      return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
   
   @staticmethod
   def get_user_data(email) -> dict:
      try:
         user_conn = DatabaseConnections.get_user_connection(db_connection)
         user_details_conn = DatabaseConnections.get_user_details_connection(db_connection)
         
         user = user_conn.find_one({"email": email.lower()})
         if user is None:
            raise Exception(f"User not found: {email}")
         
         user_details = user_details_conn.find_one({"user_id": user["_id"]})
         if user_details is None:
            raise Exception("User data not found in database.")
         
         return {
            "email": user["email"],
            "username": user["username"],
            "details": user_details
         }
      except Exception as e:
         raise e
   
   @staticmethod
   def submit_user_details(data, files):
      try:
         user_details_conn = DatabaseConnections.get_user_details_connection(db_connection)
         user_conn = DatabaseConnections.get_user_connection(db_connection)
         
         email = data["email"]
         
         if not Helper.is_user_present(email=email, conn=user_conn):
            return HTTP_RESPONSE.NOT_FOUND
         
         user_id = Helper.get_user(email=email, conn=user_conn)['_id']
         
         fs = gridfs.GridFS(db_connection)
         user_details = {
            **data
         }
         del user_details['files']
         
         file_data = []
         for i in range(len(data['files'])):
            file = files[i]
            file_name = data['files'][i]
            file_id = fs.put(file, filename=file_name, content_type=file.content_type)
            file_data.append({
               "file_id": file_id,
               "file_name": file_name,
               "file_type": file.content_type, 
            })
            
         user_details['files'] = file_data
         
         user_details_conn.insert_one({
            **user_details,
            "user_id": user_id
         })
         return HTTP_RESPONSE.OK
         
      except Exception as e:
         raise e
   
   @staticmethod
   def update_user_details(data, files):
      try:
         email = data.get("email")
         if not email:
            return HTTP_RESPONSE.BAD_REQUEST

         user_details_conn = DatabaseConnections.get_user_details_connection(db_connection)
         user_conn = DatabaseConnections.get_user_connection(db_connection)
         fs = gridfs.GridFS(db_connection)

         if not Helper.is_user_present(email=email, conn=user_conn):
            return HTTP_RESPONSE.NOT_FOUND

         user_id = Helper.get_user(email=email, conn=user_conn)['_id']

         file_names = data.get('files')
         if 'files' in data:
            del data['files']

         user_details = {
            **data,
            "user_id": user_id
         }

         file_data = []
         for i in range(len(files)):
            file = files[i]
            file_name = file_names[i] if file_names is not None else file.filename
            file_id = fs.put(file, filename=file_name, content_type=file.content_type)
            file_data.append({
               "file_id": file_id,
               "file_name": file_name,
               "file_type": file.content_type
            })

         user_details['files'] = file_data

         result = user_details_conn.update_one(
            {"user_id": user_id},
            {"$set": user_details}
         )

         if result.modified_count > 0:
            return HTTP_RESPONSE.OK
         
         return HTTP_RESPONSE.INTERNAL_SERVER_ERROR

      except Exception as e:
         raise e