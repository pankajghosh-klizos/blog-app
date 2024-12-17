import { Container, Loader } from "../../components";
import { useForm } from "react-hook-form";
import "./Signup.scss";
import localforage from "localforage";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth.slice";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSignup = async (data) => {
    try {
      setLoading(true);
      const userData = await authService.createAccount(data);
      if (userData) {
        dispatch(login(userData));
        toast.success("Account created successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5">
      <Container>
        <form
          className="form shadow mx-auto my-5 bg-body-tertiary rounded-3 p-5"
          onSubmit={handleSubmit(handleSignup)}
        >
          <h1 className="text-center mb-4 playfair">Sign up with email</h1>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              {...register("email", { required: true })}
            />
            <div className="form-text text-danger">
              {errors.email && "email is required"}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", { required: true })}
            />
            <div className="form-text text-danger">
              {errors.password && "password is required"}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="usernameHelp"
              {...register("username", { required: true })}
            />
            <div className="form-text text-danger">
              {errors.username && "username is required"}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 bg-dark border-0 py-2 d-flex align-items-center gap-2 justify-content-center"
            disabled={loading}
          >
            Continue {loading && <Loader data-bs-theme="dark" />}
          </button>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-primary cursor-pointer text-decoration-none text-black-50 fw-semibold"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Container>
    </div>
  );
};

export default Signup;
