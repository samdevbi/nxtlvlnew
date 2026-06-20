import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  const showHint = process.env.SHOW_ADMIN_LOGIN_HINT === "true";
  const hint =
    showHint && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD
      ? { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }
      : undefined;

  return <LoginForm hint={hint} />;
}
