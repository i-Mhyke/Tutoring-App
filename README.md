# Tutoring App
 ## Startng Nodejs task

 ## Elite tutors.
 ##### Base Url:  https://elitetutors.herokuapp.com/api/v1/

The Elitetutors API is organized around REST built with express. The API has predictable resource-oriented URLs, accepts JSON-encoded raw bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

## HTTP STATUS CODE SUMMARY
```
200 - OK	            Everything worked as expected.
201 - OK                    Document created successfully.
204 - OK                    Document deleted successfully.
400 - Bad Request	    The request was unacceptable, often due to missing a required parameter.
401 - Unauthorized	    No valid API key provided.
403 - Forbidden	            The API key doesn't have permissions to perform the request.
404 - Not Found	            The requested resource doesn't exist.
500- Server Errors	    Something went wrong with the server.
```

## USER SIGN-UP AND AUTHENTICATION:
### SIGN UP: 
The fields required for a user to sign up;
```
    {
    "firstName": "input first name",
    "lastName": "input last name",
    "email": "example@email.com",
    "password": "input password"(must be atleast 8 characters),
    "confirmPassword": "input password"(must be the same as password)
    }
```

#### Sign-up End-Points: 
    POST /signup            (default student sign up)
    POST /signup/tutor      (tutors sign up page)

## LOGIN:
Fields required for user to login;
```bash
    {
     "email": "user's email"
    "password": "user password"
    }   
```
#### Admin Login details:
```bash
    {
    "email": "admin@mail.com",
    "password": "admin12345"
    }
```
### Login End-Points:
    POST /login            (User login to account)
`
NB: To authenticate user after login, copy the token received after login and paste it in the authorization header after indicating Bearer as seen in the image below. 
`


![alt text](https://res.cloudinary.com/ihunaya/image/upload/v1588939883/Startng/Node%20js/Screenshot_15_uame8y.png)

## USERS MODULE:
```
Create Admin  =>     PUT /user/:tutor_id/admin     
(Restricted to admin users. Just insert the Id of tutor that would you want to have the admin role and send to server) 

Retrieve User =>     GET /users/:user_id           (Restricted to admin users. Retrieves users(tutor or student) by Id)
Delete User =>     DELETE /users/:user_id          (Restricted to admin users. Deactivates users(tutor or student) by Id)
Delete me =>       DELETE /user/me                 (User deactivates their own account)
Retrieve Users =>    GET /users                    (Restricted to admin users. Retrieves all application users)
Retrieve tutors =>   GET /tutors?sort=firstname    (All users can retrieve all tutors on the app sorted alphabetically)
Retrieve Users =>    GET /students                 (Restricted to admin users. Retrieves all students on the app)
```

## CATEGORY MODULE:
Required fields for creating category:
```bash
           {
            "name": "input category name",
            "description": "input category description" 
            }
```
```
Create Category =>      POST /category              (Restricted to admin users. Create category)
Retrieve category =>    GET  /category              (All users can get all categories)
Update Category =>      PUT /category/:category_id  (Restricted to admin users. Update category details)
Delete Category =>   DELETE /category/:category_id  (Restricted to admin users. Delete a category(Also deletes subjects 
                                                        in that category))
```
## SUBJECT MODULE: 
Required fields for creating subject:
```bash
            {
                "title": "input subject title",
                "textbook": "input textbook required for subject"
            }
```
```
Admin Create Subject Under a specific Category =>   POST /category/subject/:category_id      
All Users Retrieve Subjects By Category=>           GET /category/:category_id/subjects  
All Users Retrieve Subject by Id =>                 GET /subjects/:subject_id    
All Users Retrieve Subjects =>                      GET /subjects        
All Users Search for subject =>                     GET /subject?subject={subject name}
Admin Updates Subject details =>                    PUT /subject/:subject_id
Admin Delete Subject By Id =>                       DELETE /subject/:subject_id              
All Users Get tutors for a Subject =>               GET /subject/:subject_id/tutors    
Tutors Register to take Subject by Id =>            PATCH /tutor/subjects/:subject_id 

(Logged-in tutor just needs to put the Id of the subject he/she intends to register for in the request parameter(:subject_id) and send the request to the server, The subject Id will be embeded into tutor array of subjects)

Tutor Retrieves all His Registered Subjects =>      GET /tutor/subjects
Tutor Removes Subject registered to take =>         DELETE /tutor/subjects/:subject_id
```
## LESSON MODULE: 
Required fields for creating lessons by binding it with the students email and tutors email which are unique fields in the model.
```bash
            {
                "subject": "Input subject the student is interested in",
                "topic": "Input subject topics",
                "tutor_email": "Input the tutor booked for the lesson",
                "student_email": "Input the student that booked the lesson"
            }
```
`When student books lesson he/she does not need to input their email address (i.e student_id).`
```
Admin Create Lesson =>                                     POST /admin/lesson
Student Book Lesson with Tutor =>                          POST /student/lesson
Student Retrieve booked Lesson =>                          GET /student/lessons
Tutor Retrieve All lessons To Take =>                      GET /tutor/lessons
Admin Retrieve All lessons created on the Platform =>      GET /lessons
Admin updates lesson by Id =>                              PUT /lessons/:lesson_id 
(Admin can edit the tutor, student and subject by indicating the field and the change to be implemented)
Admin deletes lesson by Id =>                              DELETE /lesson/:lesson_id
```
