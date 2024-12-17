import axios from "axios";
import appwriteService from "../appwrite/service.js";
import parse from "html-react-parser";

const getBlog = async (id) => {
  try {
    if (Number(id) == id) {
      return await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
    } else {
      const res = await appwriteService.getPost(id);
      const parsedBody = parse(res?.body);
      const blogFromAppwrite = { ...res, body: parsedBody };
      return { data: blogFromAppwrite };
    }
  } catch (error) {
    console.log("BLOG LOADER :: ERROR :: ", error);
  }
};

const blogLoader = async ({ params }) => {
  const res = await getBlog(params.blogId);
  const blog = res.data;
  return { blog };
};

export default blogLoader;
