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

#### Deployed Url:- `https://simplifii-guddu.netlify.app/login`

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

1. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Server**

   ```bash
   npm start
   ```

## Configuration

1. **Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   EMAIL=your-email@gmail.com
   PASSWORD=your-email-password
   JWT_SECRET=your-jwt-secret
   ```

   Ensure you have a valid Gmail account set up for sending OTP emails.

2. **Database**

   Ensure you have a MongoDB instance running. You may need to configure the connection URL in your backend code if necessary.

## Usage

- **Login Page**: Access the login page at `/login` to log in or request an OTP.
- **Home Page**: After logging in successfully, users are redirected to the home page displaying a welcome message.

## Folder Structure

```
- frontend/
  - src/
    - components/          # Reusable components
    - pages/               # React components for different pages
    - redux/               # Redux setup and actions
    - utils/               # Utility functions and data
- backend/
  - controllers/           # Express route handlers
  - models/                # Mongoose models
  - routes/                # API routes
  - middleware/            # Middleware functions
  - config/                # Configuration files
- .env                     # Environment variables
- package.json             # Project dependencies and scripts
```

## Scripts

- **Frontend**
  - `npm start`: Run the React development server.
  - `npm build`: Build the React application for production.
  - `npm test`: Run tests.

- **Backend**
  - `npm start`: Start the Express server.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes and push to your branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify or add any specific details based on your actual project setup!