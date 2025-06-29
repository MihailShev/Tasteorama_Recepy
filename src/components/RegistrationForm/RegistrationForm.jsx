import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import { clearAuthError } from "../../redux/auth/slice";
import { toast } from "react-toastify";
import css from "./RegistrationForm.module.css";
import eyeOn from "../../../public/img/svg/eye-on.svg";
import eyeOff from "../../../public/img/svg/eye-off.svg";

const RegisterSchema = Yup.object({
  name: Yup.string()
    .max(16, "Name must be 16 characters or less")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .max(128, "Email must be 128 characters or less")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be 128 characters or less")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  agree: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(`Registration failed: ${error}`, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Registration successful! You are now logged in.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (values, actions) => {
    try {
      const resultAction = await dispatch(register(values));
      if (resultAction.type === "auth/register/fulfilled") {
        actions.resetForm();
        toast.success("Registration successful!");
        navigate("/");
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className={css.screen}>
      <div className={css.wrapper}>
        <h2 className={css.title}>Register</h2>
        <p className={css.text}>
          Join our community of culinary enthusiasts, save your favorite
          recipes, and share your cooking creations.
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agree: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.form}>
              <label className={css.label} htmlFor="name">
                Enter your name
                <Field
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Max"
                  className={`${css.field} ${
                    errors.name && touched.name ? css.errorField : ""
                  }`}
                />
                <div
                  className={`${css.errorMessage} ${
                    errors.name && touched.name ? css.visible : ""
                  }`}
                >
                  {errors.name}
                </div>
              </label>

              <label className={css.label} htmlFor="email">
                Enter your email address
                <Field
                  name="email"
                  type="email"
                  id="email"
                  placeholder="email@gmail.com"
                  className={`${css.field} ${
                    errors.email && touched.email ? css.errorField : ""
                  }`}
                />
                <div
                  className={`${css.errorMessage} ${
                    errors.email && touched.email ? css.visible : ""
                  }`}
                >
                  {errors.email}
                </div>
              </label>

              <label className={css.label} htmlFor="password">
                Create a strong password
                <div className={css.passwordFieldWrapper}>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="*********"
                    className={`${css.field} ${
                      errors.password && touched.password ? css.errorField : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={css.eyeToggleBtn}
                  >
                    <img
                      src={showPassword ? eyeOn : eyeOff}
                      alt={showPassword ? "Hide password" : "Show password"}
                      className={css.eyeIcon}
                    />
                  </button>
                </div>
                <div
                  className={`${css.errorMessage} ${
                    errors.password && touched.password ? css.visible : ""
                  }`}
                >
                  {errors.password}
                </div>
              </label>

              <label className={css.label} htmlFor="confirmPassword">
                Repeat your password
                <div className={css.passwordFieldWrapper}>
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="*********"
                    className={`${css.field} ${
                      errors.confirmPassword && touched.confirmPassword
                        ? css.errorField
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className={css.eyeToggleBtn}
                  >
                    <img
                      src={showConfirmPassword ? eyeOn : eyeOff}
                      alt={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      className={css.eyeIcon}
                    />
                  </button>
                </div>
                <div
                  className={`${css.errorMessage} ${
                    errors.confirmPassword && touched.confirmPassword
                      ? css.visible
                      : ""
                  }`}
                >
                  {errors.confirmPassword}
                </div>
              </label>

              <Field name="agree">
                {({ field, meta }) => (
                  <label className={css.labelCheckbox}>
                    <input
                      {...field}
                      type="checkbox"
                      className={css.checkbox}
                    />
                    <span className={css.labelText}>
                      I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>
                    </span>
                    {meta.touched && meta.error && (
                      <div className={css.errorMessage}>{meta.error}</div>
                    )}
                  </label>
                )}
              </Field>

              <button className={css.button} type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "Create account"}
              </button>

              <p className={css.bottomText}>
                Already have an account? <Link to="/auth/login">Log in</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
