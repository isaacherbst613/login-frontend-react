import LoginComponent from "./main";

const App = ({ onLoginSubmit, onSignupSubmit, styleOptions }) => {

    styleOptions = styleOptions || {
        logoSrc: '',
        loginBackgroundColor: '#bcf36a',
        signupBackgroundColor: '#fff'
    }

    return (
        <LoginComponent
            {...{
                onLoginSubmit,
                onSignupSubmit,
                styleOptions
            }}
        />
    )
}

export default App;