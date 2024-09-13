import '../assets/stylesheets/Register.css';
import { FC } from 'react';
import Logo from '../assets/images/Logo.png';  

const Register: FC = () => {
  return (
    <>
      <img src={Logo} alt="Logo" className="homeLogo"/>
    </>
  );
}

export default Register;