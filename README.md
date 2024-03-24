# Inventry-Management-System-Server

# README
### Note: Change branch to master to see code

## Steps to Run Server
1. Ensure you have Node.js and npm installed on your system.
2. Open your terminal or command prompt.
3. Navigate to the project directory.
4. Run `npm install` to install dependencies.
5. Once the installation is complete, run `node index.js` to start the server.

## Schema Design

### User
The user schema defines the structure of user data in the system.

Attributes:
- **uuid**: Unique identifier for the user.
- **name**: Name of the user.
- **email**: Email address of the user.
- **password**: Hashed password for user authentication.
- **createdAt**: Timestamp indicating when the user account was created.
- **updatedAt**: Timestamp indicating when the user account was last updated.

Example:
```json
{
  "uuid": "1a2b3c4d5e",
  "name": "Zishan Parwez",
  "email": "john@example.com",
  "password": "hashed_password",
  "createdAt": "2024-03-24T12:00:00Z",
  "updatedAt": "2024-03-24T12:00:00Z"
}
```

### Item
The item schema defines the structure of item data in the system.

Attributes:
- **uuid**: Unique identifier for the item.
- **itemName**: Name of the user.
- **addedByuuid**: Unique identifier for the user.
- **addedByName**: Name of the user who added the item.
- **createdAt**: Timestamp indicating when the item was created.
- **updatedAt**: Timestamp indicating when the item was last updated.

Example:
```json
{
  "uuid": "1a2b3c4d5e",
  "itemName": "Paint",
  "addedByuuid": "1a2b3c4d5e",
  "addedByName": "Zishan Parwez",
  "createdAt": "2024-03-24T12:00:00Z",
  "updatedAt": "2024-03-24T12:00:00Z"
}
```

The .env file stores the environment variables required for the application to function properly.

Variables:
```
PORT: Port number on which the server will listen.
MONGO_URI: MongoDB connection URI.
DB_NAME: Name of the MongoDB database.
JWT_SECRET: Secret key for JSON Web Token (JWT) encryption.
```

