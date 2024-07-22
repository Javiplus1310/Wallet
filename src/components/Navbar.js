import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import './Navbar.css'
import coins from "../images/coins.png"
const Navbar = () => {
    const [authContext, setAuthContext] = useContext(AuthContext);
    return (
        <div className="navbar-container">
            <div className="navbar-sections">
                {authContext ?
                <>
                    <img src={coins} className="logo"/>
                    <Link to="/" className="link"><h3>Inicio</h3></Link>
                    <Link to="/Perfil" className="link"><h3>Perfil</h3></Link>
                    <Link to="/Logout" className="link"><h3>Salir</h3></Link>
                </> :  
                <Link to="/Login" className="link"><h3>Iniciar Sesión</h3></Link>}
            </div>
        </div>
    )
}
export default Navbar;