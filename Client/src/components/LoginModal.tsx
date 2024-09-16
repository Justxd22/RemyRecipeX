import React, { FC } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 className="placeholder:text-gray-300 bg-transparent"
              />
              <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-100" />
            </div>
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder:text-gray-300 bg-transparent"
              />
              <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-100" />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full bg-white text-black hover:bg-custom-bg hover:text-white" type="submit">
              Login
            </Button>
          </DialogFooter>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Don’t have an account?{" "}
            <button
              type="button"
              className="text-blue-300 hover:underline"
              onClick={openRegisterModal}
            >
              Register
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
