import React, { FC } from "react";
import { FaUser, FaLock, FaTimes } from "react-icons/fa";
import "../assets/stylesheets/Home.css"; // Ensure you still use the same styles

interface LoginModalProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  openRegisterModal: () => void;
}

const LoginModal: FC<LoginModalProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onClose,
  onSubmit,
  openRegisterModal,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={onSubmit}>
          <button type="button" className="close-modal" onClick={onClose}>
            <FaTimes className="icon" />
          </button>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <button className="loginB" type="submit">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                className="regbutton"
                onClick={openRegisterModal}
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
