import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import axios from "axios";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(regex.test(value) ? "" : "Invalid email address");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const validatePassword = (value: string, repeat?: string) => {
    let error = "";
    if (value.length < 8) error = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(value))
      error = "Password must contain an uppercase letter";
    else if (!/[0-9]/.test(value)) error = "Password must contain a number";
    else if (!/[!@#$%^&*]/.test(value))
      error = "Password must contain a special character";
    else if (repeat !== undefined && value !== repeat)
      error = "Passwords do not match";
    setPasswordError(error);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value, passwordRepeat);
  };

  const handlePasswordRepeatChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordRepeat(value);
    validatePassword(password, value);
  };

  const handleRegister = async () => {
    if (!emailError && !passwordError && email && password && passwordRepeat) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/auth/register",
          {
            email,
            password,
          }
        );

        const token = res.data.token;
        if (token) localStorage.setItem("token", token);

        navigate("/dashboard");
      } catch (err: any) {
        if (err.response && err.response.data) {
          alert(err.response.data.message || "Registration failed");
        } else {
          alert("Network or server error");
        }
      }
    }
  };

  const registrationForm = (
    <div className="w-6/12 flex flex-col gap-2">
      <Input
        placeholder="Email"
        id="emailRegister"
        value={email}
        change={handleEmailChange}
        type="text"
      />
      {emailError && <span className="text-red-500 text-sm">{emailError}</span>}

      <Input
        placeholder="Password"
        id="passwordRegister"
        value={password}
        change={handlePasswordChange}
        type="password"
      />
      <Input
        placeholder="Repeat Password"
        id="passwordRepeat"
        value={passwordRepeat}
        change={handlePasswordRepeatChange}
        type="password"
      />
      {passwordError && (
        <span className="text-red-500 text-sm">{passwordError}</span>
      )}

      <Button handleClick={handleRegister}>Register</Button>
    </div>
  );

  const additional = (
    <p className="text-gray-300">
      Already have an account?{" "}
      <span
        className="text-blue-300 cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Sign In
      </span>
    </p>
  );

  return (
    <FormWrapper
      title="Registration"
      form={registrationForm}
      additional={additional}
    />
  );
}
