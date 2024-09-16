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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Register</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                  className="placeholder:text-gray-300 bg-transparent"
              />
              <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-100" />
            </div>
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
              Register
            </Button>
          </DialogFooter>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-300 hover:underline"
              onClick={openLoginModal}
            >
              Login
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
