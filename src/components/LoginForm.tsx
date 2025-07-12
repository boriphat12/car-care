import { useState } from "react";
import { useAppDispatch } from "../hooks"
import { loginUser } from "../features/auths/authSlice";
import { useNavigate } from "react-router-dom";
import './css/LoginForm.css'

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(loginUser({email, password}));
        const token = localStorage.getItem('token');
        if(token){
            navigate('/');
        } else {
            alert("Login failed!");
        }

    }
    
    return (
        <form className="Login-form" onSubmit={handleSubmit}>
            <label>
                Email: {" "}
                <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
             <label>
                Password: {" "}
                <input 
                    value={password}
                    type="password" 
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">
                Login
            </button>

        </form>
    )
}

export default LoginForm