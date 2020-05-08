# Tutoring App
 Startng Nodejs task

 Elite tutors.
 Base Url:  https://elitetutors.herokuapp.com/api/v1/

The Elitetutors API is organized around REST built with express. The API has predictable resource-oriented URLs, accepts JSON-encoded raw bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

HTTP STATUS CODE SUMMARY
200 - OK	Everything worked as expected.
201 - OK    Document created successfully.
204 - OK    Document deleted successfully.
400 - Bad Request	The request was unacceptable, often due to missing a required parameter.
401 - Unauthorized	No valid API key provided.
403 - Forbidden	The API key doesn't have permissions to perform the request.
404 - Not Found	The requested resource doesn't exist.
500- Server Errors	Something went wrong with the server.

GENERAL(ADMIN, STUDENTS, TUTORS):
SIGN UP: 
The fields required for a user to sign up;
    "firstName": "input first name",
    "lastName": "input last name",
    "email": "example@email.com",
    "password": "input password"(must be atleast 8 characters),
    "confirmPassword": "input password"(must be the same as password),

Sign-up End-Points: 
    POST /signup            (default student sign up)
    POST /signup/tutor      (tutors sign up page)

LOGIN:
Fields required for user to login;
    "email": "user's email"
    "password": "user password"

Admin Login details:
    "email": "admin@mail.com",
    "password": "admin12345"

Login End-Points:
    POST /login     

 

