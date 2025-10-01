import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Network or server error");
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const loginForm = (
    <div className="w-6/12 flex flex-col gap-2">
      <Input
        placeholder="Email"
        id="emailLogin"
        value={email}
        change={handleEmailChange}
        type="text"
      />
      {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
      <Input
        placeholder="Password"
        id="passwordLogin"
        value={password}
        change={(e) => setPassword(e.target.value)}
        type="password"
      />
      <Button handleClick={handleLogin}>Sign In</Button>
    </div>
  );

  const additional = (
    <p className="text-gray-300">
      Dont have an account?{" "}
      <span
        className="text-blue-300 cursor-pointer"
        onClick={handleRegisterClick}
      >
        Register now!
      </span>
    </p>
  );

  return (
    <FormWrapper title={"Login"} form={loginForm} additional={additional} />
  );
}
