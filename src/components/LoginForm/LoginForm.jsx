import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logIn } from "../../redux/auth/operations";
import { toast } from "react-toastify";

export default function LoginForm  ()  {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.auth.error);

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
    if (isLoggedIn) {
      toast.success("You have successfully logged in!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (values, actions) => {
    const resultAction = await dispatch(logIn(values));
    if (logIn.fulfilled.match(resultAction)) {
      actions.resetForm();
    }
  };

  const LoginSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div>
      <h2>Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">
              Email:
              <Field type="email" name="email" id="email" />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </label>

            <br />

            <label htmlFor="password">
              Password:
              <Field type="password" name="password" id="password" />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />
            </label>

            <br />
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>

      <p>
        Don't have an account? <Link to="/auth/register">Register</Link>
      </p>
    </div>
  );
};
