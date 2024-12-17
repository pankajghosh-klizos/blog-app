import authService from "../appwrite/auth.js";
import localforage from "localforage";

const getCurrentUser = async () => {
  const user = await authService.getCurrentUser();
  return user;
};

// user loader
export default async function rootLoader() {
  const user = await getCurrentUser();
  if (user) {
    await localforage.setItem("user", user.$id);
  }
  return { user };
}
