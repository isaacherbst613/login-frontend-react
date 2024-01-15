import LoginComponent from "./main";

const App = ({ onLogin,
    onSignup,
    onLogout,
    onForgotCreds,
    emailSent,
    loggedIn,
    sideSection,
    styleOptions
}) => {

    /* mfa? */

    const theme = {
        color: 'green'
        , backgroundColor: 'pink'
        , backgroundColor2: 'grey'
        , secondaryColor: 'lightblue'
    }

    return (
        <LoginComponent
            {...{
                onLogin,
                onSignup,
                onLogout,
                onForgotCreds,
                loggedIn,
                sideSection,
                styleOptions
            }}
        />
    )
}

export default App;