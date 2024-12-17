import { useLoaderData } from "react-router-dom";
import { Container } from "../../components";
import "./Blog.scss";

const Blog = () => {
  const { blog } = useLoaderData();

  return (
    <Container>
      <article className="py-5">
        <h1 className="display-1 fw-semibold mb-5 lh-1 playfair">
          {blog?.title}
        </h1>
        <div className="fs-4">{blog?.body}</div>
      </article>
    </Container>
  );
};

export default Blog;
