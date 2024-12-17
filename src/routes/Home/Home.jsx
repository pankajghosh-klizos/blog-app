import "./Home.scss";
import { Card, Container } from "../../components";
import { useNavigate, useLoaderData } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { blogs } = useLoaderData();

  return (
    <Container>
      <div className="py-5 home">
        <h1 className="display-1 fw-semibold mb-5 lh-1 playfair">
          Human <span className="d-block lh-1">stories & ideas</span>
        </h1>
        <p className="fs-4 mb-5">
          A place to read, write, and deepen your understanding
        </p>
        <button
          type="button"
          className="btn btn-primary btn-lg rounded-pill bg-dark border-0 px-5"
          onClick={() => navigate("/blogs")}
        >
          Start reading
        </button>
      </div>
      <div className="my-5">
        <h2 className="fs-1 fw-semibold mb-4">Latest Blogs</h2>
        <ul className="d-flex p-0 flex-wrap gap-4">
          {blogs.map((blog) => (
            <li key={blog.id} className="list-group-item">
              <Card id={blog?.id} title={blog?.title} body={blog?.body} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Home;
