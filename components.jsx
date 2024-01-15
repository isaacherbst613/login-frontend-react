import { useEffect, useState } from "react";
import Input from "./items/Input";
import Loader3dots from "./items/three-dots";
import { createPortal } from "react-dom";

const LoginForm = ({ mode, onLogin, onSignup }) => {
    const [info, setInfo] = useState({});
    const [required, setRequired] = useState(false);
    const [triedSubmit, submit] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        submit(false);
    }, [mode])

    const updateInfo = (newInfo) => {
        setInfo({ ...info, ...newInfo });
    }

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        submit(true);
        const { login_username, login_password, signup_username, email, createpassword, repeatpassword } = info;
        //validate and submit
        if (mode === 'login') {
            if (login_username && login_password) {
                const res = await onLogin({ username: login_username, password: login_password });
                if (!res.success) {
                    setRequired('Wrong user name or password');
                }
            } else {
                setRequired('Missing required fields');
            }
        } else if (mode === 'signup') {
            if (signup_username && email && createpassword && repeatpassword) {
                if (createpassword !== repeatpassword) {
                    setRequired('Passwords don\'t match');
                } else {
                    const res = await onSignup({ username: signup_username, email, password: createpassword });
                    if (!res.success) {
                        setRequired('Sorry, that didn\'t work');
                    }
                    setRequired(false);
                }
            } else {
                setRequired('Missing required fields');
            }
        }
        setLoading(false);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="rfl_form-block__input-wrapper">

                <div className="rfl_form-group rfl_form-group--login">
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
                <div className="rfl_form-group rfl_form-group--signup">
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
            <div className="rfl_requiredMsg">{triedSubmit ? required : ''}</div>
            <button
                className="rfl_button rfl_button--large rfl_button--primary"
                type="submit"
            >
                {loading ? <Loader3dots scale=".3" /> :
                    mode === 'login' ? 'Log In' : 'Sign Up'
                }
            </button>
        </form>
    )
}

const Logout = ({ onLogout }) => {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await onLogout();
        setLoading(false);
    }

    return (
        <div className="rfl_logout-section">
            <h3>
                You are already logged in.
            </h3>
            <button onClick={handleLogout} className="rfl_button rfl_button--large rfl_button--primary">
                {loading ? <Loader3dots /> : 'Logout'}
            </button>
        </div>
    )
}

const Forgot = ({ onForgotCreds }) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [sent, setSent] = useState(false);

    const sendEmail = async () => {
        setSent('sending');
        if (email) {
            await onForgotCreds(email);
            setSent('sent');
        } else {
            setError(true);
        }
    }

    return (<>
        <div
            onClick={() => setShow(p => !p)}
            className="rfl_forgotCreds"
        >
            I forgot my username or password
        </div>
        {show && createPortal(<div className="rfl_forgot-group">
            <div className="rfl_background"></div>
            <div className="rfl_wrapper">
                <div>We will send an email to help you reset your username/password.</div>
                <br />
                <Input
                    onChange={(val) => {
                        setEmail(val);
                        setError(false);
                    }}
                    value={email}
                    type="email"
                    name="email"
                    label="Email"
                    disabled={!show}
                    required={error}
                />
                <div className="rfl_button--group">
                    <button className="rfl_button rfl_button--large rfl_button--secondary" onClick={() => setShow(false)}>
                        Cancel
                    </button>
                    <button className="rfl_button rfl_button--large rfl_button--primary" onClick={sendEmail}>
                        {sent === 'sending' ? <Loader3dots scale=".2" /> :
                            !sent ? 'Send' : 'Resend'}
                    </button>
                </div>
                {sent === 'sent' && <div style={{ fontSize: 14, marginTop: 10 }}>An email was sent, please check your inbox</div>}
            </div>
        </div>, document.body)}
    </>)
}

export { LoginForm, Logout, Forgot }