import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logIn } from "../../redux/auth/operations"; // Асинхронна операція
import { clearAuthError } from "../../redux/auth/slice.js";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";
import eyeOn from "../../../public/img/svg/eye-on.svg";
import eyeOff from "../../../public/img/svg/eye-off.svg";

// Валідація форми
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

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [showPassword, setShowPassword] = useState(false);

  // Обробка помилок при вході
  useEffect(() => {
    if (error) {
      toast.error(`Login failed: ${error}`, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
      });
    }
  }, [error]);

  // Перехід на головну сторінку після успішного входу
  useEffect(() => {
    if (isLoggedIn) {
      toast.success("You have successfully logged in!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/"); // Перехід на головну
    }
  }, [isLoggedIn, navigate]);

  // Очистка помилок при розмонтажі компонента
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  // Обробка відправлення форми
  const handleSubmit = async (values, actions) => {
    try {
      // Викликаємо асинхронну операцію логіну
      const resultAction = await dispatch(logIn(values));

      // Якщо операція виконана успішно
      if (logIn.fulfilled.match(resultAction)) {
        actions.resetForm(); // Очищуємо форму
      } else {
        // Якщо сталася помилка
        toast.error("Login failed.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
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
          {({ resetForm }) => (
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
                          <img
                            src={showPassword ? eyeOn : eyeOff}
                            alt={
                              showPassword ? "Hide password" : "Show password"
                            }
                            className={css.eyeIcon}
                          />
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
                Don't have an account? <Link to="/auth/register">Register</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
