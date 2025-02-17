import AppWrapper from "../AppWrapper/AppWrapper";
import Header from "../Header/Header";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
  return (
    <AppWrapper size="sm">
      <Header title="Login to your account" />
      <LoginForm />
    </AppWrapper>
  );
};

export default Login;
