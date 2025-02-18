import AppWrapper from "@components/AppWrapper/AppWrapper";
import Header from "@components/Header/Header";
import LoginForm from "@components/Login/LoginForm/LoginForm";

const Login = () => {
  return (
    <AppWrapper size="sm">
      <Header title="Login to your account" />
      <LoginForm />
    </AppWrapper>
  );
};

export default Login;
