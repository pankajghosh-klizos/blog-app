import axios from "axios";
import appwriteService from "../appwrite/service";
import parse from "html-react-parser";

const getBlogs = async () => {
  const blogLimit = 20;
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const blogsFromAppwrite = await appwriteService.getPosts();

    const parsedBlogs = blogsFromAppwrite
      ? blogsFromAppwrite.documents.map((blog) => {
          const parsedBody = parse(blog.body);
          return { ...blog, body: parsedBody };
        })
      : [];

    const newBlogs = [...parsedBlogs, ...response.data.slice(0, blogLimit)];
    return newBlogs;
  } catch (error) {
    console.log(error);
  }
};

// blogs loader
export default async function blogsLoader() {
  const blogs = await getBlogs();
  return { blogs };
}
