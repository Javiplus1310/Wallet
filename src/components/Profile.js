import { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css'
import user from '../images/user.png'
const Profile = () => {
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   useEffect(() => {
   async function getProfile(){
   const token = localStorage.getItem('token')
   if(token){
   const { data } = await axios.get('http://localhost:8000/profile', {
   headers: {
   'Authorization': `Bearer ${token}`
   }
   })
   console.log(data)
   setUsername(data.username)
   setEmail(data.email)
   setPhone(data.phone)
   }
 }
 getProfile()
 }, [])
 return (
 <>
 <div className="profile-container">
  <img src={user} className="user"/>
 <h1>Perfil de Usuario</h1>
 <p>Nombre de Usuario: {username}</p>
 <p>Dirección de Correo: {email}</p>
 <p>Teléfono Celular: {phone}</p>
 </div>
 </>

 );
 }

 export default Profile;