import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/auth.slice.js";
import { useState } from "react";
import Loader from "../Loader/Loader.jsx";
import toast from "react-hot-toast";
import localforage from "localforage";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
      await localforage.removeItem("user");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-primary rounded bg-dark border-0 px-3 d-flex align-items-center gap-2 justify-content-center w-100"
      onClick={logoutHandler}
      disabled={loading}
    >
      <span>Log out</span> {loading && <Loader data-bs-theme="dark" />}
    </button>
  );
};

export default LogoutBtn;
