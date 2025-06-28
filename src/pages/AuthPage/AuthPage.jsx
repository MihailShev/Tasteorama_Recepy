import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { useParams } from "react-router-dom";

export default function AuthPage() {
  const { authType } = useParams();
  return (
    <div className="container">
      {authType === "register" && <RegistrationForm />}
      {authType === "login" && <LoginForm />}
    </div>
  );
}
