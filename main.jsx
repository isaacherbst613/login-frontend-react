import { useEffect, useState } from "react";
import './login.css';
import { LoginForm, Forgot, Logout } from "./components";

const LoginComponent = ({
    onLogin,
    onSignup,
    onLogout,
    onForgotCreds,
    loggedIn,
    sideSection,
    styleOptions
}) => {

    const { theme, darkMode } = styleOptions || {};
    darkMode && document.documentElement.setAttribute('data-theme', 'dark');

    useEffect(() => {
        if (theme) {
            let r = document.querySelector(':root');
            const { color, backgroundColor, backgroundColor2, secondaryColor } = theme;
            color && r.style.setProperty('--color', color);
            backgroundColor && r.style.setProperty('--background-color-login', backgroundColor);
            backgroundColor2 && r.style.setProperty('--background-color-signup', backgroundColor2);
            secondaryColor && r.style.setProperty('--secondary-color', secondaryColor);
        }
    }, []);

    const [mode, setMode] = useState('login');

    function toggleMode() {
        const newMode = mode !== 'signup' ? 'signup' : 'login';
        setMode(newMode);
    }

    return (
        <div className={`rfl_app rfl_app--is-${mode}`}>
            <div className={`rfl_form-block-wrapper rfl_form-block-wrapper--is-${mode}`} ></div>
            <div className={`rfl_section-wrapper rfl_is-${mode}`}>
                {!!sideSection && (
                    <section className={`rfl_form-block rfl_logo-section is-${mode}`}>
                        {sideSection}
                    </section>
                )}
                <section className={`rfl_form-block rfl_form-block--is-${mode}`}>
                    {!loggedIn ? <>
                        <header className="rfl_form-block__header">
                            <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
                            <div className="rfl_form-block__toggle-block">
                                <span>{mode === 'login' ? 'Don\'t' : 'Already'} have an account?  </span>
                                <button className="rfl_button rfl_button--primary rfl_button--small" onClick={toggleMode} color="inherit">
                                    Click here
                                </button>
                            </div>
                        </header>
                        <LoginForm
                            mode={mode}
                            toggleMode={toggleMode}
                            onLogin={onLogin}
                            onSignup={onSignup}
                            onForgotCreds={onForgotCreds}
                        />
                        {mode !== 'signup' && <Forgot onForgotCreds={onForgotCreds} />}
                    </> : <Logout onLogout={onLogout} />
                    }
                </section>
            </div>
        </div>
    )
}

export default LoginComponent;