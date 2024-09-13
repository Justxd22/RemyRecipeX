import '../assets/stylesheets/Login.css';
import { FC } from 'react';
import Logo from '../assets/images/Logo.png';  

const Login: FC = () => {
  return (
    <>
      <img src={Logo} alt="Logo" className="homeLogo"/>
    </>
  );
}

export default Login;