import { LuLogIn } from "react-icons/lu";

import useAuth from "@hooks/useAuth";
import { Button, ErrorWarning, Input } from "@components/ui";

const LoginForm = () => {
  const { login, error } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    login(
      formData.get("username")?.toString().trim() ?? "",
      formData.get("password")?.toString().trim() ?? ""
    );
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      {error ? <ErrorWarning message={error} /> : null}
      <Input label="Username" name="username" placeholder="Username" required />
      <Input label="Password" name="password" placeholder="Password" required />
      <Button
        type="submit"
        size="lg"
        icon={<LuLogIn />}
        className="text-md min-h-14"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
