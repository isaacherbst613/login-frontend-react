# Using the `Login` Component

## Getting Started

### Installation

```bash
npm install login-frontend-react 
```
React is obvs a dependency

## Component Overview
### `Login` Component
The `Login` accepts the following props:

* `onLogin`: A function triggered upon login form submission.
* `onSignup`: A function invoked when the signup form is submitted.
* `onLogout`: A function invoked when on logout.
* `onForgotCreds`: A function invoked on 'forgot password'.
* `loggedIn`: boolean, if true will show logout page.
* `sideSection`: component to display on side of form.
* `styleOptions`: An optional object.

## Usage
To use the Login component, follow these steps:

Import the Login component into your desired file:

```import Login from "login-frontend-react";```

Create the functions to handle form submissions, (all functions are required). i.e.:

```
const onLogin = (userData) => {
    // Logic to handle login submission
    // e.g., API calls, state updates, etc.
};

const onSignup = (userData) => {
    // Logic to handle signup submission
    // e.g., API calls, state updates, etc.
};
```
Optionally, define custom styling options for the login and signup forms, stylingOptions include:
```
const customStyleOptions = {
    darkMode: boolean
    theme:  {
        color, 
        backgroundColor, 
        backgroundColor2, 
        secondaryColor
    }
};
```
Implement the App component, passing the required props:

```
const YourComponent = () => {
    return (
        <Login
            onLogin={handleLoginSubmit}
            onSignup={handleSignupSubmit}
            onLogout={handleLogout}
            onForgotCreds={handleResetPassword}
            loggedIn={loggedIn}
            sideSection={<Logo/>}
            styleOptions={customStyleOptions}
        />
    );
};
```

Modify the styleOptions object to tailor the visual appearance of the login and signup forms according to your preferences.

