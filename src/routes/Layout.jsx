import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { Footer, Header } from "../components";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth.slice";

const Layout = () => {
  const { user } = useLoaderData();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      dispatch(login({ user }));
    }
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="d-flex w-100 min-vh-100 flex-column">
        <Header />
        <main
          className={`flex-grow-1 ${
            navigation.state === "loading" ? "loading" : ""
          }`}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
