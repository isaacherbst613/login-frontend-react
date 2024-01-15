import React from 'react';

export interface AppProps {
    onLogin: (userData: any) => void;
    onSignup: (userData: any) => void;
    onLogout: (userData: any) => void;
    onForgotCreds: (userData: any) => void;
    loggedIn: boolean,
    sideSection?: any,
    styleOptions?: {
        loginBackgroundColor: string;
        signupBackgroundColor: string;
        darkMode: boolean;
    };
}

declare const App: React.FC<AppProps>;
export default App;