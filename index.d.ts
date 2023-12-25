import React from 'react';

export interface AppProps {
    onLoginSubmit: (userData: any) => void;
    onSignupSubmit: (userData: any) => void;
    styleOptions?: {
        logoSrc: string;
        loginBackgroundColor: string;
        signupBackgroundColor: string;
    };
}

declare const App: React.FC<AppProps>;
export default App;