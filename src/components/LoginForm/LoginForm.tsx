import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { tableActions } from '../../redux/slices/tableSlice';
import { loginValidator } from '../../validators/Validators';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import TextField from '@mui/material/TextField';
import "./LoginForm.css";

const LoginForm: FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        formState: { errors, isValid },
    } = useForm({
        mode: 'all',
        resolver: joiResolver(loginValidator),
    });

    const login = async (formData: any) => {
        try {
            await login(formData);
            dispatch(tableActions.setQueryIsLoggedIn(true));
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/table');
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setError('Невірний логін або пароль');
            } else {
                setError('Помилка авторизації. Будь ласка, спробуйте ще раз пізніше.');
            }
        }
    };

    return (
        <div>
            <form className="Form">
                <TextField
                    label="Username"
                    variant="outlined"
                    {...register('username')}
                    fullWidth
                />
                {errors.username && (<span>{errors.username?.message as string}</span>)}
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register('password')}
                    fullWidth
                />
                {errors.password && (<span>{errors.password?.message as string}</span>)}
                {error && <div className="error">{error}</div>}
                <button onClick={login} className="Button" disabled={!isValid}>
                    Login
                </button>
            </form>
        </div>
    );
};

export { LoginForm };
