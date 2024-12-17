import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const navItems = [
    { id: 1, slug: "/", label: "Home" },
    { id: 2, slug: "/our-story", label: "Our Story" },
    { id: 3, slug: "/blogs", label: "Blogs" },
    { id: 4, slug: "/write", label: "Write" },
    { id: 5, slug: "/my-blogs", label: "My Blogs" },
  ];
  return (
    <header className="border">
      <Container>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand fs-2 playfair" to="/">
              ReadMe.
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-lg-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-lg-0 gap-2">
                {navItems.map((navItem, index) => (
                  <li key={navItem?.id || index} className="nav-item">
                    <NavLink
                      className="nav-link fw-semibold"
                      aria-current="page"
                      to={navItem?.slug}
                    >
                      {navItem?.label}
                    </NavLink>
                  </li>
                ))}

                {!authStatus && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-semibold"
                      aria-current="page"
                      to="/sign-in"
                    >
                      Sign in
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  {!authStatus ? (
                    <button
                      type="button"
                      className="btn btn-primary rounded-pill bg-dark border-0 px-3"
                      onClick={() => navigate("/sign-up")}
                    >
                      Get started
                    </button>
                  ) : (
                    <LogoutBtn />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
