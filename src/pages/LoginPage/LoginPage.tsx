import React, {FC} from 'react';
import {LoginForm} from "../../components/LoginForm/LoginForm";
import "./LoginPage.css"

const LoginPage: FC = () => {
    return (
        <div className="LoginBox">
            <h2>Login Page</h2>
            <LoginForm/>
        </div>
    );
};

export {LoginPage};
