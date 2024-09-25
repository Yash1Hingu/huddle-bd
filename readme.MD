
# 📬 Messaging API

This is a backend messaging API created with Node.js, Express, and MongoDB. It allows users to register, log in, create channels, send messages, and manage join requests.

## 📑 Table of Contents
- [🚀 Getting Started](#getting-started)
- [📡 API Endpoints](#api-endpoints)
  - [👤 User Routes](#user-routes)
  - [📢 Channel Routes](#channel-routes)
  - [💬 Message Routes](#message-routes)
  - [🔗 Join Request Routes](#-oin-request-routes)
- [🔐 Middleware](#middleware)
- [⚠️ Error Handling](#error-handling)
- [📜 License](#license)

---

## 🚀 Getting Started

### 🛠 Prerequisites

- **Node.js**: Install Node.js on your machine.
- **MongoDB**: Set up MongoDB, either locally or using MongoDB Atlas.
- **dotenv**: Ensure you have a `.env` file for environment variables.

### ⚙️ Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/messaging-api.git
   cd messaging-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   MONGOOSE_URL=mongodb://localhost:27017/yourDatabaseName
   JWT_TOKEN=your_jwt_secret_key
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000` (or the port specified in the `.env` file).

---

## 📡 API Endpoints

### 👤 User Routes

#### 1. **🔐 Register a User**
- **POST** `/api/user`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "username": "username",
    "email": "email@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "_id": "userId",
      "username": "username",
      "email": "email@example.com",
      "tokens": ["token"]
    },
    "token": "JWT-token"
  }
  ```

#### 2. **🔓 User Login**
- **POST** `/api/user/login`
- **Description**: Authenticate and log in a user, returning a JWT.
- **Request Body**:
  ```json
  {
    "email": "email@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "_id": "userId",
      "username": "username",
      "email": "email@example.com",
      "tokens": ["token"]
    },
    "token": "JWT-token"
  }
  ```

---

### 📢 Channel Routes

#### 1. **📥 Create a Channel**
- **POST** `/api/channel/create`
- **Description**: Creates a new channel. The authenticated user is added to the channel.
- **Authorization**: Requires a valid JWT token in the `Authorization` header.
- **Request Body**:
  ```json
  {
    "channelName": "channelName",
    "description": "A brief description"
  }
  ```
- **Response**:
  ```json
  {
    "new_channel": {
      "_id": "channelId",
      "channelName": "channelName",
      "users": ["userId"]
    },
    "userData": {
      "_id": "userId",
      "channels": ["channelId"]
    }
  }
  ```

#### 2. **📜 Get User Channels**
- **GET** `/api/channels`
- **Description**: Retrieves all channels the authenticated user is part of.
- **Authorization**: Requires a valid JWT token in the `Authorization` header.
- **Response**:
  ```json
  {
    "channels": [
      {
        "_id": "channelId",
        "channelName": "channelName"
      }
    ]
  }
  ```

---

### 💬 Message Routes

#### 1. **✉️ Send a Message**
- **POST** `/api/channels/:channelId/messages`
- **Description**: Sends a message in a specific channel.
- **Authorization**: Requires a valid JWT token in the `Authorization` header.
- **Request Body**:
  ```json
  {
    "message": "This is a message."
  }
  ```
- **Response**:
  ```json
  {
    "new_message": {
      "_id": "messageId",
      "channelId": "channelId",
      "sender": "userId",
      "message": "This is a message."
    }
  }
  ```

#### 2. **🗨 Get Messages by Channel**
- **GET** `/api/channels/:channelId/messages`
- **Description**: Fetches all messages from a specific channel.
- **Authorization**: Requires a valid JWT token in the `Authorization` header.
- **Response**:
  ```json
  [
    {
      "_id": "messageId",
      "channelId": "channelId",
      "sender": "userId",
      "message": "This is a message.",
      "createdAt": "timestamp"
    }
  ]
  ```

---

### 🔗 Join Request Routes

#### 1. **🔗 Send Join Request**
- **POST** `/api/channels/:channelId/join`
- **Description**: Sends a join request to a specific channel.
- **Authorization**: Requires a valid JWT token in the `Authorization` header.
- **Request Body**:
  ```json
  {
    "recipientUserId": "recipientUserId"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Join request sent successfully"
  }
  ```

#### 2. **✅ Accept Join Request**
- **POST** `/api/channels/:channelId/join/accept`
- **Description**: Accepts a pending join request for the authenticated user to join the channel.
- **Authorization**: Requires a valid JWT token in the `Authorization` header.
- **Response**:
  ```json
  {
    "message": "Join request accepted and user added to the channel"
  }
  ```

---

## 🔐 Middleware

### `auth.js`
- **🛡 Purpose**: Validates the JWT token in the `Authorization` header to authenticate the user for protected routes.
- **🔄 Usage**: Add `auth` middleware to routes that require authentication.

---

## ⚠️ Error Handling

All errors follow this structure:
```json
{
  "error": "Error message"
}
```

---

This version now includes the **Join Request** functionality under the `Join Request Routes` section, detailing both sending and accepting join requests.