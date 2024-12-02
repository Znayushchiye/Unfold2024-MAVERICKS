class ENDPOINTS:
   # Define API endpoints here
   LOGIN = '/login'
   REGISTER = '/register'
   HOME = '/home'
   DASHBOARD = '/dashboard'
   SUBMIT_DETAILS = '/submit_details'
   EDIT_DETAILS = '/edit_details'

class HTTP_RESPONSE:
   # Define HTTP response codes here
   OK = 200
   CREATED = 201
   BAD_REQUEST = 400
   UNAUTHORIZED = 401
   NOT_FOUND = 404
   INTERNAL_SERVER_ERROR = 500