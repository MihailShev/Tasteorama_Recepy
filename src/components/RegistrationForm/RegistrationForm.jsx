import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import css from "./RegistrationForm.module.css";

import eyeOn from "../../assets/icons/eye-on.svg";
import eyeOff from "../../assets/icons/eye-off.svg";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .max(16, "Maximum 16 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .max(128, "Maximum 128 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .max(128, "Maximum 128 characters")
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

  const handleSubmit = async (values, actions) => {
    const { name, email, password } = values;
    const resultAction = await dispatch(register({ name, email, password }));
    if (register.fulfilled.match(resultAction)) {
      actions.resetForm();
    }
  };

  return (
    <div className={css.screen}>
      <div className={css.wrapper}>
        <h2 className={css.title}>Register</h2>
        <p className={css.text}>
          Join our community of culinary enthusiasts, save your favorite
          recipes, and share your cooking creations
        </p>

        <Formik
          initialValues={{
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
            agree: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
                      {meta.touched && meta.error && (
                        <div className={css.errorMessage}>{meta.error}</div>
                      )}
                    </>
                  )}
                </Field>
              </label>

              <label className={css.label} htmlFor="name">
                Enter your name
                <Field name="name">
                  {({ field, meta }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        id="name"
                        placeholder="Max"
                        className={`${css.field} ${
                          meta.touched && meta.error ? css.errorField : ""
                        }`}
                      />
                      {meta.touched && meta.error && (
                        <div className={css.errorMessage}>{meta.error}</div>
                      )}
                    </>
                  )}
                </Field>
              </label>

              <label className={css.label} htmlFor="password">
                Create a strong password
                <Field name="password">
                  {({ field, meta }) => (
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
                        <img
                          src={showPassword ? eyeOn : eyeOff}
                          alt={showPassword ? "Hide password" : "Show password"}
                          className={css.eyeIcon}
                        />
                      </button>
                      {meta.touched && meta.error && (
                        <div className={css.errorMessage}>{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
              </label>

              <label className={css.label} htmlFor="confirmPassword">
                Repeat your password
                <Field name="confirmPassword">
                  {({ field, meta }) => (
                    <div className={css.passwordFieldWrapper}>
                      <input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="*********"
                        className={`${css.field} ${
                          meta.touched && meta.error ? css.errorField : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className={css.eyeToggleBtn}
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        <img
                          src={showConfirmPassword ? eyeOn : eyeOff}
                          alt={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          className={css.eyeIcon}
                        />
                      </button>
                      {meta.touched && meta.error && (
                        <div className={css.errorMessage}>{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
              </label>

              <label className={css.labelCheckbox}>
                <Field
                  name="agree"
                  type="checkbox"
                  className={({ field, meta }) =>
                    `${css.checkbox} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`
                  }
                />
                <div className={css.textWrapper}>
                  <span className={css.labelText}>
                    I agree to the <a href="/terms">Terms of Service</a> and{" "}
                    <a href="/privacy">Privacy Policy</a>
                  </span>
                  <ErrorMessage
                    name="agree"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>
              </label>

              <button
                className={css.button}
                type="submit"
                disabled={isSubmitting}
              >
                Create account
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
