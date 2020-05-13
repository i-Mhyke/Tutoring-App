# Tutoring App
 ## Startng Nodejs task 5

 #### Base Url:  https://elitetutors.herokuapp.com/api/v1/

The Elitetutors API is organized around REST built with express. The API accepts JSON-encoded raw bodies as well x-www-form-urlencoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs. 


## HTTP STATUS CODE SUMMARY
```
200 - OK	            Everything worked as expected.
201 - OK                    Document created successfully.
204 - OK                    Document deleted successfully.
400 - Bad Request	    The request was unacceptable, often due to missing a required parameter.
401 - Unauthorized	    No valid API key provided.
403 - Forbidden	            The API key doesn't have permissions to perform the request.
404 - Not Found	            The requested resource doesn't exist.
500 - Server Errors	    Something went wrong with the server.
```

# USER SIGN-UP AND AUTHENTICATION:
### Admin Login details
#### Test routes assigned to only admin users
`Route:     POST /login`
```bash
    {
    "email": "admin@mail.com",
    "password": "admin12345"
    }
```
## SIGN UP: 
The fields required for a user to sign up;
```bash
    {
    "firstName": "input first name",
    "lastName": "input last name",
    "email": "example@email.com",
    "password": "input password"(must be atleast 8 characters),
    "confirmPassword": "input password"(must be the same as password)
    }
```
#### Sign-up End-Points 
    POST    /signup            (default student sign up)
    POST    /signup/tutor      (tutors sign up page)

## LOGIN:
Fields required for user to login;
```bash
    {
    "email": "user's email"
    "password": "user password"
    }   
```
### Login End-Points:
    POST    /login            (User login to account)
    
### NB: All routes after login requires token authentication, to proceed after login, copy the token received after login and paste it in the authorization header after indicating Bearer as seen in the image below.


![alt text](https://res.cloudinary.com/ihunaya/image/upload/v1588939883/Startng/Node%20js/Screenshot_15_uame8y.png)


# USERS ROUTES:
## Create Admin User (ONLY ADMIN) 
#### Parameters required: Input the tutor's Id into the url and send request to the server
`Route:     PATCH /user/:tutor_id/admin` 

## Retrieve Users and Update Users (ONLY ADMIN)
Parameters required: Input the user's Id into the url and send request to the server to retrieve the specific user
#### Retrieve a specific user with the id
`Route:     GET     /users/:user_id`  
#### Retrrieve all users
`Route:     GET     /users`
#### Delete the user with the inputed Id
`Route:     DELETE  /users/:user_id` 
#### Update the user details
`Route:     PUT     /users/:user_id`
#### Retrieve all students only
`Route:     GET     /students` 

## Users Update and Delete Their accounts  (ALL USERS)
`Parameters Required: User must be loggedIn (i.e Token must be in autorization header)`
#### User deactivates/ deletes their account
`Route:     DELETE  /user/me`
#### User Updates their account details
`Route:     PATCH   /user/me`

## Sort for all the tutors Alphabetically(Open to all Users)
`Route:     GET     /tutors?sort=firstname`

# CATEGORY ROUTES
Required fields for creating category:
```bash
           {
            "name": "input category name",
            "description": "input category description" 
            }
```
#### CREATE CATEGORY (ONLY ADMIN)
`Route:     POST    /category`

#### GET CATEGORIES  (ALL USERS)
`Route:     GET     /categories`

#### UPDATE CATEGORY    (ONLY ADMIN)
`Route:     PUT     /categories/:category_id`

#### DELETE CATEGORY    (ONLY ADMIN)
`Route:     DELETE  /categories/:category_id`


# SUBJECT ROUTES: 
Required fields for creating subject:
```bash
        {
            "title": "input subject title",
            "textbook": "input textbook required for subject"
        }
```

## CREATE SUBJECT UNDER CATEGORY  (ONLY ADMIN)
#### Required Parameters: ID of category that the subject will be created under
`Route:     POST /category/subject/:category_id`

## UPDATE AND DELETE SUBJECT  (ONLY ADMIN)
### Update Subject details
#### Required Parameters: Subject Id to be updated
`Route:     PUT     /subject/:subject_id`
### Delete Subject
#### Required Parameters: Subject Id to be deleted
`Route:     DELETE  /subject/:subject_id`

## RETRIEVE SUBJECTS (ALL USERS)
### By Category
#### Required Parameters: ID of category
`Route:     GET /category/:category_id/subjects`

### By Subject Id
#### Required Parameters: ID of subject
`Route:     GET /subjects/:subject_id`

### All subjects
`Route:     GET /subjects`

### Seacrch for subject by name
#### Required Parameters: Input the name of the subject in the subject field
`Route:     GET /subject?subject={subject name}`

### Get all tutors taking a particular subject
#### Required Parameters: Subject Id 
`Route:     GET /subject/:subject_id/tutors`

##  TUTOR'S ROUTE FOR SUBJECTS    (ONLY TUTORS)
### Register to take Subject
##### Required Parameters: Input Id of the subject that tutor wants to register for and send the request to the server. This automatically registers the subject under the array of subjects for the tutor.
`Route:    PATCH   /tutor/subjects/:subject_id`

### Tutor Get all registered subject
`Route:    GET     /tutor/subjects` 

### Tutor Delete subjects registered for
`Route:   DELETE   /tutor/subjects/:subject_id`


# LESSON ROUTES: 
Required fields for creating lessons by binding it with the students email and tutors email which are unique fields in the model.
```bash
            {
                "subject": "Input subject the student is interested in",
                "topic": "Input subject topics",
                "tutor_email": "Input the tutor booked for the lesson",
                "student_email": "Input the student that booked the lesson"
            }
```

## CREATE LESSON  (ONLY ADMIN)
#### Admin creates Lesson based on the parameters above using the route below
`Route:        POST /admin/lesson`

## CREATE LESSON  (ONLY STUDENTS)
`Route:     POST   /student/lesson`
##### Students can book for lesson with the following parameters:
```bash
            {
                "subject": "Input subject the student is interested in",
                "topic": "Input subject topics",
                "tutor_email": "Input the tutor booked for the lesson"
            }
```

## RETRIEVE LESSONS
### GET ALL LESSONS   (ONLY ADMIN)
#### Admin retrieves all lessons booked in the application
`Route:     GET   /lessons`

### GET ALL LESSONS BOOKED    (ONLY STUDENTS)
#### students retrieve lessons they booked and lessons booked for them by the admin
`Route:     GET /student/lessons`

### GET ALL LESSONS BOOKED    (ONLY TUTORS)
#### Tutors retrieve all lessons they are expected to take part in
`Route:     GET /tutor/lessons`

### UPDATE LESSON  (ONLY ADMIN)
#### Admin Update lesson details (eg. Student, Tutor, Subject,)
`Route:     PUT /lessons/:lesson_id`

#### DELETE LESSON  (ADMIN ONLY)
`Route:     DELETE /lesson/:lesson_id`

