import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../redux/auth/operations";
import { clearAuthError } from "../../redux/auth/slice.js";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .max(128, "Email must be 128 characters or less")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be 128 characters or less")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(`Login failed: ${error}`, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
      });
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(logIn(values)).unwrap();
      actions.resetForm();
      toast.success("Login successful!");
      navigate("/");
    } catch {
      toast.error("Login failed.");
    }
  };
  return (
    <div className={css.screen}>
      <div className={css.wrapper}>
        <h2 className={css.title}>Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <label className={css.label} htmlFor="email">
              Enter your email address
              <Field name="email">
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="email@gmail.com"
                      className={`${css.field} ${
                        meta.touched && meta.error ? css.errorField : ""
                      }`}
                    />
                    <div className={css.errorMessage}>
                      {(meta.touched && meta.error) || "\u00A0"}
                    </div>
                  </>
                )}
              </Field>
            </label>
            <label className={css.label} htmlFor="password">
              Enter your password
              <Field name="password">
                {({ field, meta }) => (
                  <>
                    <div className={css.passwordFieldWrapper}>
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="*********"
                        className={`${css.field} ${
                          meta.touched && meta.error ? css.errorField : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className={css.eyeToggleBtn}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        <svg className={css.eyeIcon}>
                          <use
                            href={`/public/img/svg/icons.svg#${
                              showPassword ? "icon-eye" : "icon-eye-crossed"
                            }`}
                            fill="none"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className={css.errorMessage}>
                      {(meta.touched && meta.error) || "\u00A0"}
                    </div>
                  </>
                )}
              </Field>
            </label>

            <button className={css.button} type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className={css.bottomText}>
              Don&apos;t have an account?{" "}
              <Link to="/auth/register">Register</Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
