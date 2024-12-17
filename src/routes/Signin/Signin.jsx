import { useDispatch } from "react-redux";
import { Container, Loader } from "../../components";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login } from "../../store/auth.slice";
import { useState } from "react";
import "./Signin.scss";
import localforage from "localforage";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const handleSignin = async (data) => {
    try {
      setLoading(true);
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          await localforage.setItem("user", userData.$id);
          setLoading(false);
          toast.success("user login succesfully");
          return navigate("/blogs");
        }
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
          onSubmit={handleSubmit(handleSignin)}
        >
          <h1 className="text-center mb-4 playfair">Sign in with email</h1>

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

          <button
            type="submit"
            className="btn btn-primary w-100 bg-dark border-0 py-2 d-flex align-items-center gap-2 justify-content-center"
            disabled={loading}
          >
            <span>Continue</span> {loading && <Loader data-bs-theme="dark" />}
          </button>
          <p className="text-center mt-3">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-primary cursor-pointer text-black-50 text-decoration-none fw-semibold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Container>
    </div>
  );
};

export default Signin;
