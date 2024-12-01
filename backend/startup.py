import pymongo
from backend.config import MONGO_URI

def init_db_connection():
   try:
     client = pymongo.MongoClient(MONGO_URI)
   except pymongo.errors.ConfigurationError:
     print("An Invalid URI host error was received. Check your configuration settings and try again.")
     exit(1)
     
   print("Initializing database connection...")
   db = client.database
   return db
   
def run_server(app):
   app.run(debug=True)