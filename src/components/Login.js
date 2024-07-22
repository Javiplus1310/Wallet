import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { AuthContext } from '../App';
import login from '../images/Login.png';
const Login = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [authContext, setAuthContext] = useContext(AuthContext);
 const onLogin = async () => {
    const { data } = await axios.post('http://localhost:8000/login',
   {username: email, password})
    localStorage.setItem('token', data.token)
    const jwt = "jwt";
    localStorage.setItem('auth', jwt)
    setAuthContext(jwt)
    navigate("/Perfil")
    }
 return (
 <div className='login-container'>
 <img src={login} className="login"/>
 <h1>Login</h1>
 <div className='login-inputs'>
 <input value={email} onChange={e => setEmail(e.target.value)}
placeholder='Usuario' type="text" />
 <input value={password} onChange={e => setPassword(e.target.value)}
placeholder='Contraseña' type="password" />
 <button onClick={onLogin}>Ingresar</button>
 </div>
 </div>);
}
export default Login;