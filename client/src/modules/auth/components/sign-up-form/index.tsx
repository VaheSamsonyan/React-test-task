import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { signUpSchema } from "./schema";
import { signUpUser } from "@modules/auth/model/auth-slice.ts";
import { useAppDispatch } from "@shared/hooks/use-app-dispatch.ts";
import type { RegisterFormValues } from "@modules/auth/types";
import "./style.css";
import { routePath } from "@shared/constants/route.ts";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const isSubmitDisabled = !isValid || !isDirty;

  const onSubmit = async (data: RegisterFormValues) => {
    setSubmitError(null);
    try {
      const result = await dispatch(signUpUser(data));

      if (signUpUser.fulfilled.match(result)) {
        const { user, token } = result.payload;
        if (user && token) {
          navigate(routePath.getLogin());
        }
      } else {
        setSubmitError("Registration failed. Please check your input.");
      }
    } catch (err) {
      setSubmitError("Something went wrong. Try again later.");
      console.error("Signup error:", err);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="login-title">Sign Up</h2>

      <div className="form-group">
        <label>First Name</label>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <input
              {...field}
              className="form-input"
              placeholder="Enter your first name"
            />
          )}
        />
        {errors.firstName && (
          <span className="error-text">{errors.firstName.message}</span>
        )}

        <label>Last Name</label>
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <input
              {...field}
              className="form-input"
              placeholder="Enter your last name"
            />
          )}
        />
        {errors.lastName && (
          <span className="error-text">{errors.lastName.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Password</label>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <input
              type="password"
              {...field}
              className="form-input"
              placeholder="Enter your password"
            />
          )}
        />
        {errors.password && (
          <span className="error-text">{errors.password.message}</span>
        )}
      </div>

      {submitError && <p className="error-text">{submitError}</p>}

      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitDisabled}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
