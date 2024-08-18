---

# Login Flow

This project is a user authentication system built with React, Redux, and Node.js. It includes features for user registration, login, OTP (One-Time Password) handling, and JWT (JSON Web Token) authentication.

## Features

- **User Registration**: Allows new users to register with email and receive an OTP for verification.
- **User Login**: Enables users to log in using their email and OTP.
- **OTP Management**: Send and resend OTPs to users via email.
- **JWT Authentication**: Secure user authentication using JWT tokens.
- **Responsive Design**: User interface built with React and styled with Tailwind CSS.

## Installation

### Frontend

#### Deployed Url:- `https://simplifii-guddu.netlify.app`

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/login-flow.git
   cd login-flow
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm start
   ```

### Backend

#### Deployed Url:- `https://simplifii-assinment-login-flow.onrender.com`


---

## Overview

This project is a Node.js application using Express for the backend with JWT authentication and OTP-based user registration. It also uses Nodemailer for sending OTPs via email.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web application framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **JWT**: JSON Web Token for authentication.
- **Nodemailer**: Module for sending emails.
- **dotenv**: Module to load environment variables from a `.env` file.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```
   EMAIL=your_email@gmail.com
   PASSWORD=your_email_password
   JWT_SECRET=your_jwt_secret
   PORT=8080
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

## Routes

### 1. Register User

- **Endpoint**: `/user/register`
- **Method**: `POST`
- **Description**: Registers a new user after validating the OTP.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "name": "User Name",
    "mobile": "1234567890",
    "isd": "+1",
    "otp": "123456"
  }
  ```
- **Responses**:
  - `201 Created`: Successfully registered.
  - `404 Not Found`: User already registered.
  - `400 Bad Request`: Invalid OTP.
  - `500 Internal Server Error`: Server error.

### 2. Get OTP

- **Endpoint**: `/user/getotp`
- **Method**: `POST`
- **Description**: Sends an OTP to the specified email.
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Responses**:
  - `200 OK`: OTP sent successfully.
  - `409 Conflict`: Email already registered.
  - `500 Internal Server Error`: Server error.

### 3. Resend OTP

- **Endpoint**: `/user/resendotp`
- **Method**: `POST`
- **Description**: Resends a new OTP to the specified email.
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Responses**:
  - `200 OK`: OTP resent successfully.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Server error.

### 4. Login User

- **Endpoint**: `/user/login`
- **Method**: `POST`
- **Description**: Logs in a user after verifying the OTP.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Responses**:
  - `201 Created`: Login successful with JWT token.
  - `404 Not Found`: User not found.
  - `400 Bad Request`: Invalid OTP.
  - `403 Forbidden`: User is locked out.
  - `500 Internal Server Error`: Server error.

### 5. Get User Details

- **Endpoint**: `/user/singleuser`
- **Method**: `GET`
- **Description**: Retrieves user details based on JWT token.
- **Headers**:
  - `token`: JWT token (required)
- **Responses**:
  - `200 OK`: User details retrieved successfully.
  - `403 Forbidden`: Unauthorized (Invalid token).
  - `404 Not Found`: User not found.
  - `401 Unauthorized`: Invalid token.

## Middleware

### 1. Verify Token Middleware

- **Path**: `Middleware/Authentication.Middleware.js`
- **Description**: Verifies the JWT token provided in the request headers. Adds user information to the request object if valid.

### 2. OTP Limit Middleware

- **Path**: `Middleware/LoginAttempt.Middleware.js`
- **Description**: Limits the number of OTP attempts. Locks the user out for 30 minutes after 5 incorrect attempts.

## User Model

- **Schema Fields**:
  - `name`: User's name (required).
  - `email`: User's email (required, unique).
  - `mobile`: User's mobile number (required).
  - `isd`: International dialing code (required).
  - `otp`: OTP for verification (default: "1234").
  - `otpAttempts`: Number of OTP attempts (default: 0).
  - `lockoutUntil`: Date until which the user is locked out (default: null).

---
---

## Technologies Used

- **Frontend:**
  - **React:** For building user interfaces.
  - **React Router DOM:** For routing and navigation within the application.
  - **Tailwind CSS:** For styling and layout.
  - **Redux:** For state management.
  - **React-Toastify:** For displaying notifications.

- **Backend:**
  - **Node.js** (Assumed): For handling server-side logic (details not provided).

## Routing Details

### MainRoutes Component

- **Location:** `src/Routes/MainRoutes.js`
- **Description:** Defines the main routes of the application.

#### Routes

1. **Home Route**
   - **Path:** `/`
   - **Component:** `PrivateRoute` wrapped around `Home`
   - **Description:** Accessible only for authenticated users. Redirects to login if the user is not authenticated.

2. **Register Route**
   - **Path:** `/register`
   - **Component:** `Signup`
   - **Description:** Allows users to register by providing their details and receiving an OTP for verification.

3. **Login Route**
   - **Path:** `/login`
   - **Component:** `Login`
   - **Description:** Provides a login form for users to access their accounts.

### PrivateRoute Component

- **Location:** `src/Routes/PrivateRoute.js`
- **Description:** Protects routes that require authentication. Checks if the user is authenticated and handles token verification.

#### Key Points

- **Authentication Check:** Uses Redux to check if the user is authenticated.
- **Token Handling:** Retrieves token from local storage and verifies user status.
- **Loading State:** Displays a loading indicator while checking authentication status.
- **Redirect:** Redirects unauthenticated users to the login page.

### Signup Component

- **Location:** `src/Page/Signup/Signup.js`
- **Description:** Handles user registration, including form validation, OTP handling, and user registration.

#### Key Features

- **Form Fields:**
  - Salutation
  - Name
  - Country Code
  - Mobile Number
  - Email
  - OTP (conditionally shown based on button state)
  
- **Button States:**
  - **"Get OTP on email":** Initiates OTP request.
  - **"Submit":** Submits registration details and OTP for verification.

- **OTP Handling:** Manages OTP request and submission with a timer for re-sending OTP.
- **Validation:** Validates form inputs and OTP before submission.

### Home Component

- **Location:** `src/Page/Home/Home.js`
- **Description:** Displays a welcome message to authenticated users.

#### Key Features

- **User Greeting:** Displays the logged-in user's name and a welcome message.
- **Navbar:** Includes a navigation bar component for user interactions.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes and push to your branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify or add any specific details based on your actual project setup!