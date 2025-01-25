
# Note Management System

OverView
The Note Management System is a web application designed for users to create, manage, and audit notes efficiently. It includes user authentication and role-based access control, allowing both regular users and admins to perform specific actions. The system tracks all changes made to notes and user profiles for accountability.


## Features

- User Authentication: Secure login and registration for users.
- Note Management: Users can create, update, delete, and retrieve notes.
- Admin Capabilities: Admins can manage user profiles and audit notes.
- Role-Based Access Control: Different permissions for users and admins.


# API Endpoint

## User Authentication

### Login

```http
  POST /api/auth/login
```
Content-Type: application/json

    {
    "email":"youreamil@gmail.com"
    "password":"yourpassword",
    }



Response

    {
    "success": true,
    "message": "Login successfully",
    "token":"sqdmwwpfmqoojkqwpd87e8d74d7ddnfdd"
    }


### Register

```http
  POST /api/auth/register
```
Content-Type: application/json

    {
    "name":"user@example.com",
    "email": "youremail@gmail.com",
    "password":"yourpassword",
    "role": "admin|user"
    }


Response

    {
    "success": true,
    "message": "User register successfully"
    }



## Notes Management

### Create Note

```http
POST /api/notes
```

Content-Type: application/json

    {
    "title": "My First Note",
    "description": "This is the content of my first note.",
    "status": "active"
    }

Response

    {
    "success": true,
    "message": "Note created Successfully"
    }


### Update Notes

 


Content-Type: application/json

    {  
    "title": "Updated Note Title",
    "content": "Updated content of the note.",
    "status":"updated"
    }

Response

    {
    "success": true,
    "message": "Note updated successfully"
    }


### Delete Notes

```http
DELETE /api/notes/:userId
```

DELETE /api/user/67939c355432c6de5e2766f6


Response

    {   
    "success": true,
    "message": "Note deleted successfully"
    }


### Get All notes

```http
GET /api/notes
```
Response

    { 
    "success": true,
    "notes": [
    {   
    "_id": "note_id_here",
    "title": "My First Note",
    "content": "This is the content of my first note."               
    },
    // More notes...
    ]
    }


## Admin Endpoints

###  Get All User Profiles

```http
GET /api/user
```

Response


    {
    "success": true,
    "users": [
    {  "_id": "user_id_here",
    "name": "John Doe",
           
    }, // More users...
    ]
    }



### Get Specific User Details

```http
GET /api/user/:userId
```


Response

    {
    "success": true,
    "user": {
    "_id": "67939c355432c6de5e2766f6",
    "name": "John Doe",
    "email": "john.doe@example.com"
    "role": "admin"
    }
    }


### Delete User Profile

```http
DELETE /api/user/:userId
```


Response

    {

    "success": true,
    "message": "User profile deleted successfully"
    }

###  Get All Notes in DB (Audit)

```http
GET /api/audit/notes
```



Response

    {
    "success": true,
    "notes": [  // Array of notes...
    ]
    }

### Get Specific User Notes 


```http
GET /api/audit/notes/:userId
```


Response

    {
    "success": true,
    "notes": [
    // Array of user's notes...
    ]
    }


# Setup Instuctions

## Prerequisites
#### > Node.js (version >=14.x)
#### > MongoDB (local)


##  Installation Steps


### 1.Clone the repository:

    git clone https://github.com/yourusername/note-management-system.git
    cd note-management-system

### 2.Install dependencies:

    npm install

### 3.Create a .env file in the root directory and add your environment variables:
    
    PORT=your_Portnumber
    MONGODB_URI=your_mongodb_connection_string
    SECRET_KEY=your_jwt_secret_key

### 4.Start the server:

    npm start

# Conclusion

This README provides a comprehensive overview of the Note Management System project, including its features, API endpoints with examples, and setup instructions. Ensure to keep this document updated as your project evolves. Feel free to modify any sections according to your project specifics or preferences! If you have any further questions or need additional assistance, let me know!