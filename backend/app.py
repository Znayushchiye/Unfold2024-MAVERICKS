from flask import Flask, request, jsonify
from flask_cors import CORS

from backend.helper import Helper
from backend.startup import run_server
from backend.constants import ENDPOINTS, HTTP_RESPONSE

app = Flask(__name__) 
CORS(app)

@app.route(ENDPOINTS.HOME) 
def home():
   return "Hello, World!"

@app.route(ENDPOINTS.REGISTER, methods=['POST'])
def register():
   try:
      data = request.get_json()
      username = data.get('username')
      email = data.get('email')
      password = data.get('password')
      if email is None or password is None or username is None:
         return jsonify({
            "error": f"Missing {'email' if (email is None) else 'password' if (password is None) else 'username'} in request."
         }), HTTP_RESPONSE.BAD_REQUEST

      if Helper.is_user_present(email=email):
         return jsonify({"error": "User already exists."}), HTTP_RESPONSE.BAD_REQUEST
      
      hashed_password = Helper.get_hashed_password(password=password)

      Helper.create_new_user(email, hashed_password, username)
      
      return jsonify({"message": "User created successfully"}), HTTP_RESPONSE.OK
   except Exception as e:
      return jsonify({"error": str(e)}), HTTP_RESPONSE.INTERNAL_SERVER_ERROR

@app.route(ENDPOINTS.LOGIN, methods=['POST'])
def login():
   try:
      data = request.get_json()
      email = data.get('email')
      password = data.get('password')
      
      if email is None or password is None:
         return jsonify({
            "error": f"Missing {'email' if (email is None) else 'password'} in request."
         }), HTTP_RESPONSE.BAD_REQUEST
      
      response = Helper.authenticate_user(email, password)
      
      if response == HTTP_RESPONSE.OK:
         user_details: dict = Helper.get_user_data(email)
         response = {
            **user_details,
            "message": "User found successfully"
         }
         return jsonify(response), HTTP_RESPONSE.OK
      elif response == HTTP_RESPONSE.NOT_FOUND:
         return jsonify({"error": "User not found"}), HTTP_RESPONSE.NOT_FOUND
      
      return jsonify({"error": "Invalid credentials"}), HTTP_RESPONSE.UNAUTHORIZED
   except Exception as e:
      return jsonify({"error": str(e)}), HTTP_RESPONSE.INTERNAL_SERVER_ERROR

@app.route(ENDPOINTS.DASHBOARD, methods=['GET'])
def dashboard():
   try:
      email = request.args.get('email')
      
      if email is None:
         return jsonify({"error": "Missing 'email' in request."}), HTTP_RESPONSE.BAD_REQUEST         
      
      user_details: dict = Helper.get_user_data(email)
      if user_details is None:
         return jsonify({"error": "User not found"}), HTTP_RESPONSE.NOT_FOUND
      
      user_details = {
         **user_details,
         "message": "User data fetched successfully"
      }
      
      return jsonify(user_details), HTTP_RESPONSE.OK
   except Exception as e:
      return jsonify({"error": str(e)}), HTTP_RESPONSE.INTERNAL_SERVER_ERROR

@app.route(ENDPOINTS.SUBMIT_DETAILS, methods=['POST'])
def submit_details():
   try:
      data = request.form.to_dict()
      if 'multipart/form-data' not in request.headers.get("Content-Type") or 'files' not in request.files:
         return jsonify({"error": "Invalid request. Use correct header and send files in request body."}), HTTP_RESPONSE.BAD_REQUEST
      
      files = request.files.getlist('files')
      
      response = Helper.submit_user_details(data, files)
      
      if response == HTTP_RESPONSE.OK:
         return jsonify({"message": "User details submitted successfully"}), HTTP_RESPONSE.OK
      elif response == HTTP_RESPONSE.NOT_FOUND:
         return jsonify({"error": "User not found"}), HTTP_RESPONSE.NOT_FOUND
      elif response == HTTP_RESPONSE.UNAUTHORIZED:
         return jsonify({"error": "Invalid credentials"}), HTTP_RESPONSE.UNAUTHORIZED
      
      return jsonify({"error": "Failed to submit user details"}), HTTP_RESPONSE.INTERNAL_SERVER_ERROR
   except Exception as e:
      return jsonify({"error": str(e)}), HTTP_RESPONSE.INTERNAL_SERVER_ERROR

@app.route(ENDPOINTS.EDIT_DETAILS, methods=['PATCH'])
def edit_details():
   try:
      data = request.form.to_dict()
      
      if 'multipart/form-data' not in request.headers.get("Content-Type"):
         return jsonify({"error": "Invalid request. Use correct header for request body."}), HTTP_RESPONSE.BAD_REQUEST
      
      files = request.files.getlist('files')
      
      response = Helper.update_user_details(data, files)
      
      if response == HTTP_RESPONSE.OK:
         return jsonify({"message": "User details updated successfully"}), HTTP_RESPONSE.OK
      elif response == HTTP_RESPONSE.NOT_FOUND:
         return jsonify({"error": "User not found"}), HTTP_RESPONSE.NOT_FOUND
      elif response == HTTP_RESPONSE.UNAUTHORIZED:
         return jsonify({"error": "Invalid credentials"}), HTTP_RESPONSE.UNAUTHORIZED
      elif response == HTTP_RESPONSE.BAD_REQUEST:
         return jsonify({"error": "Invalid request"}), HTTP_RESPONSE.BAD_REQUEST
      
      return jsonify({"error": "Failed to update user details"}), HTTP_RESPONSE.INTERNAL_SERVER_ERROR

   except Exception as e:
      return jsonify({"error": str(e)}), HTTP_RESPONSE.INTERNAL_SERVER_ERROR

if __name__ == '__main__':
   run_server()