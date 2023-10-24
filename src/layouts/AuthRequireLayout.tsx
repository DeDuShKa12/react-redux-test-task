import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

const AuthRequireLayout = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        return (
            <>
                <Outlet/>
            </>
        );
    } else {
        return (
            <Navigate to="/login" />
        );
    }
};

export { AuthRequireLayout };
