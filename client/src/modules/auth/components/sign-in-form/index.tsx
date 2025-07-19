import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { signInSchema } from "./schema";
import { routePath } from "@shared/constants/route.ts";
import { signIn } from "@modules/auth/model/auth-slice.ts";
import type { LoginPost } from "@modules/auth/types";
import { useAppDispatch } from "@shared/hooks/use-app-dispatch.ts";
import "./style.css";

const SignInForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginPost>({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const isSubmitDisabled = !isValid || !isDirty;

  const onSubmit = async (data: LoginPost) => {
    try {
      dispatch(signIn(data));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <p className="form-link">
        Don’t have an account? <Link to={routePath.getSignUp()}>Register</Link>
      </p>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login-title">Login</h2>

        <div className="form-group">
          <label style={{ color: "black" }}>First name</label>
          <input
            type="text"
            {...register("firstName")}
            className="form-input"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <span className="error-text">{errors.firstName.message}</span>
          )}

          <label style={{ color: "black" }}>Last name</label>
          <input
            type="text"
            {...register("lastName")}
            className="form-input"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <span className="error-text">{errors.lastName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label style={{ color: "black" }}>Password</label>
          <input
            type="password"
            {...register("password")}
            className="form-input"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="error-text">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitDisabled}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default SignInForm;
