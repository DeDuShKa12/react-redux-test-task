import { FC, useState } from 'react';
import { login } from "../../services";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { tableActions } from "../../redux/slices/tableSlice";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./LoginForm.css"

const LoginForm: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        try {
            await login(username, password);
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
        <form className="Form">
            <div>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div className="error">{error}</div>}
            <Button variant="contained" color="primary" onClick={handleLogin} className="Button">
                Login
            </Button>
        </form>
    );
};

export { LoginForm };
