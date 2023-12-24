import { useState } from "react";
import Visible from './items/visibility.jsx';
import VisibleOff from './items/visibility-off.jsx';
import './login.css';

const LoginComponent = ({ onLoginSubmit, onSignupSubmit, styleOptions }) => {

    const { logoSrc, loginBackgroundColor, signupBackgroundColor } = styleOptions || {};
    const [mode, setMode] = useState('login');
    function toggleMode() {
        const newMode = mode === 'login' ? 'signup' : 'login';
        setMode(newMode);
    }



    return (
        <div className={`app app--is-${mode}`}>
            <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} style={{ backgroundColor: mode === 'login' ? loginBackgroundColor : signupBackgroundColor }} ></div>
            <div className={`section-wrapper is-${mode}`}>
                <section className={`logo-section is-${mode}`} style={{ backgroundColor: mode !== 'login' ? loginBackgroundColor : signupBackgroundColor }}>
                    <img src={logoSrc} alt="logo" />
                </section>
                <section className={`form-block form-block--is-${mode}`}>
                    <header className="form-block__header">
                        <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
                        <div className="form-block__toggle-block">
                            <span>{mode === 'login' ? 'Don\'t' : 'Already'} have an account?  </span>
                            <button className="button button--secondary" onClick={toggleMode} color="inherit">
                                Click here
                            </button>
                        </div>
                    </header>
                    <LoginForm mode={mode} onLoginSubmit={onLoginSubmit} onSignupSubmit={onSignupSubmit} />
                </section>
            </div>
        </div>
    )
}

const LoginForm = ({ mode, onLoginSubmit, onSignupSubmit }) => {
    const [info, setInfo] = useState({});
    const [required, setrequired] = useState(false);
    const [triedSubmit, submit] = useState(false);

    const updateInfo = (newInfo) => {
        setInfo({ ...info, ...newInfo });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        submit(true);
        const { login_username, login_password, signup_username, email, createpassword, repeatpassword } = info;
        //validate and submit
        if (mode === 'login') {
            if (login_username && login_password) {
                onLoginSubmit({ username: login_username, password: login_password });
            } else {
                setrequired('Missing required fields')
            }
        } else {
            if (signup_username && email && createpassword && repeatpassword) {
                if (createpassword !== repeatpassword) {
                    setrequired('Passwords don\'t match');
                } else {
                    onSignupSubmit()
                    setrequired(false);
                }
            }
        }
    }



    return (
        <form onSubmit={onSubmit}>
            <div className="form-block__input-wrapper">
                <div className="form-group form-group--login">
                    <Input
                        onChange={(val) => updateInfo({ login_username: val })}
                        value={info.login_username}
                        type="text"
                        name="login_username"
                        label="Username"
                        disabled={mode === 'signup'}
                        required={triedSubmit}
                    />
                    <Input
                        onChange={(val) => updateInfo({ login_password: val })}
                        value={info.login_password}
                        type="password"
                        name="login_password"
                        label="Password"
                        disabled={mode === 'signup'}
                        required={triedSubmit}
                    />
                </div>
                <div className="form-group form-group--signup">
                    <Input
                        onChange={(val) => updateInfo({ signup_username: val })}
                        value={info.signup_username}
                        type="text"
                        name="signup_username"
                        label="Username"
                        disabled={mode === 'login'}
                        required={triedSubmit}
                    />
                    <Input
                        onChange={(val) => updateInfo({ email: val })}
                        value={info.email}
                        type="email"
                        name="email"
                        label="Email"
                        disabled={mode === 'login'}
                        required={triedSubmit}
                    />
                    <Input
                        onChange={(val) => updateInfo({ createpassword: val })}
                        value={info.createpassword}
                        type="password"
                        name="createpassword"
                        label="Password"
                        disabled={mode === 'login'}
                        required={triedSubmit}
                    />
                    <Input
                        onChange={(val) => updateInfo({ repeatpassword: val })}
                        value={info.repeatpassword}
                        type="password"
                        name="repeatpassword"
                        label="Repeat Password"
                        disabled={mode === 'login'}
                        required={triedSubmit}
                    />
                </div>
            </div>
            <button className="button button--primary full-wnameth" type="submit">{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
            {required && <span> {required}</span>}
        </form>
    )
}

export default LoginComponent;

const Input = ({ name, onChange, value, type, label, disabled, required }) => {
    const [showPassword, setShow] = useState(false);
    return (<div className="form-group__input">
        <input
            type={showPassword ? 'text' : type}
            name={name}
            placeholder={label}
            disabled={disabled}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={(required && !value) ? 'error' : ''}
        />
        {type === 'password' && (
            <span className="form-group__input_icon" onClick={() => setShow(pre => !pre)}>
                {showPassword ? <Visible size="20" /> : <VisibleOff size="20" />}
            </span>
        )}
    </div>)
};