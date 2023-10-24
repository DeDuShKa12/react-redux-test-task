import React, { FC, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Header.css';
import {useAppSelector} from "../../hooks";
import {useDispatch} from "react-redux";
import {tableActions} from "../../redux/slices/tableSlice";

const Header: FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useAppSelector(state => state.tableReducer.isLoggedIn);

    useEffect(() => {
        dispatch(tableActions.setQueryIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true'));
    }, [isLoggedIn, dispatch]);

    const logOut = () => {
        localStorage.removeItem('isLoggedIn');
        dispatch(tableActions.setQueryIsLoggedIn(false));
    }

    return (
        <div className="Header">
            <div>
                <NavLink to={'table'}>Table</NavLink>
            </div>
            <div>
                {isLoggedIn ? <NavLink to={'/login'} onClick={logOut}>LogOut</NavLink> : <NavLink to={'/login'}>LogIn</NavLink>}
            </div>
        </div>
    );
};

export { Header };
