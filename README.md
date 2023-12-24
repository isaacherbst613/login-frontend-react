# Using the `App` Component with `LoginComponent`

The `App` component is designed to integrate the `LoginComponent` within your React application. This guide provides an overview of how to utilize the `App` component and its associated functionalities.

## Getting Started

### Installation

```bash
npm install login-frontend-react 
```
React is obvs a dependency
### Importing the Login Component

## Component Overview
### `Login` Component
The `Login` accepts the following props:

* `onLoginSubmit`: A function triggered upon login form submission.
* `onSignupSubmit`: A function invoked when the signup form is submitted.
* `styleOptions`: An optional object that customizes the visual aspects of the login and signup forms.
## Usage
To use the Login component, follow these steps:

Import the Login component into your desired file:

```import Login from "login-frontend-react";```

Create functions `handleLoginSubmit` and `handleSignupSubmit` to handle login and signup form submissions, respectively:

```
const handleLoginSubmit = (userData) => {
    // Logic to handle login submission
    // e.g., API calls, state updates, etc.
};

const handleSignupSubmit = (userData) => {
    // Logic to handle signup submission
    // e.g., API calls, state updates, etc.
};
```
Optionally, define custom styling options for the login and signup forms:
```
const customStyleOptions = {
    logoSrc: '/path/to/custom/logo.png',
    loginBackgroundColor: '#bcf36a',
    signupBackgroundColor: '#fff'
};
```
Implement the App component, passing the required props:

```
const YourComponent = () => {
    return (
        <Login
            onLoginSubmit={handleLoginSubmit}
            onSignupSubmit={handleSignupSubmit}
            styleOptions={customStyleOptions} // Optional: Customize styles
        />
    );
};
```

Modify the styleOptions object to tailor the visual appearance of the login and signup forms according to your preferences.

