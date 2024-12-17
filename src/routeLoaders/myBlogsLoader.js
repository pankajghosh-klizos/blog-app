import appwriteService from "../appwrite/service.js";
import parse from "html-react-parser";
import localforage from "localforage";

const getMyBlogs = async () => {
  try {
    const userId = await localforage.getItem("user");

    if (userId) {
      const response = await appwriteService.getPostsByUserId(userId);
      const blogs = response.documents;
      const parsedBlogs = blogs.map((blog) => {
        return {
          ...blog,
          body: parse(blog.body),
        };
      });
      return parsedBlogs;
    }
  } catch (error) {
    console.log(error);
  }
};

const myBlogLoader = async () => {
  const blogs = await getMyBlogs();
  return { blogs: blogs || [] };
};

export default myBlogLoader;
