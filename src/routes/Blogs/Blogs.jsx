import { useLoaderData } from "react-router-dom";
import { Card, Container } from "../../components";
import "./Blogs.scss";

const Blogs = () => {
  const { blogs } = useLoaderData();
  return (
    <div className="py-5">
      <Container>
        <ul className="d-flex p-0 flex-wrap gap-4">
          {blogs.map((blog) => (
            <li key={blog.id || blog?.$id} className="list-group-item w-100">
              <Card
                id={blog?.id || blog?.$id}
                title={blog?.title}
                body={blog?.body}
              />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default Blogs;
