import axios from "axios";

const getBlogs = async () => {
  const blogLimit = 6;
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const newBlogs = response.data.slice(0, blogLimit);
    return newBlogs;
  } catch (error) {
    console.log(error);
  }
};

// blogs loader
export default async function homeLoader() {
  const blogs = await getBlogs();
  return { blogs };
}
