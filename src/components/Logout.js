import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Logout = () => {
    const [authContext, setAuthContext] = useContext(AuthContext);
    const navigate = useNavigate();
    localStorage.removeItem('token')
    localStorage.setItem('auth', null)
    setAuthContext(null);
    navigate("/Login")
}

export default Logout;