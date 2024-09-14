import React, { FC } from "react";
import { FaUser, FaLock, FaTimes } from "react-icons/fa";
import "../assets/stylesheets/Home.css"; // Ensure you still use the same styles

interface RegisterModalProps {
  name: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  openLoginModal: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  onClose,
  onSubmit,
  openLoginModal,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={onSubmit}>
          <button type="button" className="close-modal" onClick={onClose}>
            <FaTimes className="icon" />
          </button>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
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
            Register
          </button>
          <div className="register-link">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="regbutton"
                onClick={openLoginModal}
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
