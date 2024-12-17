import { useLoaderData } from "react-router-dom";
import { Card, Container } from "../../components";
import "./MyBlogs.scss";

const MyBlogs = () => {
  const { blogs } = useLoaderData();

  return (
    <div className="py-5">
      <Container>
        {blogs.length > 0 ? (
          <ul className="d-flex p-0 flex-wrap gap-4">
            {blogs.map((blog) => (
              <li key={blog?.$id} className="list-group-item w-100">
                <Card
                  id={blog?.$id}
                  title={blog?.title}
                  body={blog?.body}
                  isAuthor
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center fs-4">
            You have not created any blogs yet.
          </p>
        )}
      </Container>
    </div>
  );
};

export default MyBlogs;
