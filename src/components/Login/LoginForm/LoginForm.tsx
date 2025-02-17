import { useState } from "react";
import { LuLogIn } from "react-icons/lu";

import useAuth from "../../../hooks/useAuth";
import Button from "../../ui/Button/Button";
import ErrorWarning from "../../ui/ErrorWarning/ErrorWarning";
import Input from "../../ui/Input/Input";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username.trim(), password.trim());
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      {error ? <ErrorWarning message={error} /> : null}
      <Input
        label="Username"
        name="username"
        placeholder="Username"
        required
        setInputValue={setUsername}
      />

      <Input
        label="Password"
        name="password"
        placeholder="Password"
        required
        setInputValue={setPassword}
      />

      <Button type="submit" size="lg" icon={<LuLogIn />}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
