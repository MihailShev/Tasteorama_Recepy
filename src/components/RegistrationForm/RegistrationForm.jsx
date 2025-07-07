import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import css from "./RegistrationForm.module.css";

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

  const { error, isLoading } = useSelector((state) => state.auth);

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
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };
  const handleSubmit = async (values, actions) => {
    const { name, email, password } = values;
    try {
      await dispatch(register({ name, email, password })).unwrap();
      actions.resetForm();
      toast.success(
        `Welcome aboard, ${name}! We're excited to have you with us!`
      );
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed.");
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
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.form}>
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
                    <svg className={css.eyeIcon}>
                      <use
                        href={`/img/svg/icons.svg#${
                          showPassword ? "icon-eye" : "icon-eye-crossed"
                        }`}
                        fill="none"
                      />
                    </svg>
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
                    <svg className={css.eyeIcon}>
                      <use
                        href={`/img/svg/icons.svg#${
                          showConfirmPassword ? "icon-eye" : "icon-eye-crossed"
                        }`}
                        fill="none"
                      />
                    </svg>
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
                  <div className={css.checkboxWrapper}>
                    <label className={css.labelCheckbox}>
                      <input
                        {...field}
                        type="checkbox"
                        className={css.checkbox}
                        id="agree-checkbox"
                      />
                      <span className={css.checkboxCustom}>
                        <svg width="16" height="16">
                          <use href="/img/svg/icons.svg#icon-Privacy-Policy" />
                        </svg>
                      </span>
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
                    </label>

                    {meta.touched && meta.error && (
                      <div
                        className={`${css.errorMessage} ${
                          meta.touched && meta.error ? css.visible : ""
                        }`}
                      >
                        {meta.error}
                      </div>
                    )}
                  </div>
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
