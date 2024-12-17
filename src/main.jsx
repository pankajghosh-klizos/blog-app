import { createRoot } from "react-dom/client";
import * as bootstrap from "bootstrap";
// Import our custom CSS
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Blog,
  Blogs,
  Error,
  Home,
  Layout,
  MyBlogs,
  OurStory,
  Signin,
  Signup,
  Write,
} from "./routes";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  rootLoader,
  homeLoader,
  blogsLoader,
  blogLoader,
  myBlogLoader,
} from "./routeLoaders";
import { HydrateFallback, ProtectedRoute } from "./components";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      loader: rootLoader,
      HydrateFallback: HydrateFallback,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
        },
        {
          path: "our-story",
          element: <OurStory />,
        },
        {
          path: "write",
          element: (
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          ),
        },
        {
          path: "sign-in",
          element: (
            <ProtectedRoute authentication={false}>
              <Signin />
            </ProtectedRoute>
          ),
        },
        {
          path: "sign-up",
          element: (
            <ProtectedRoute authentication={false}>
              <Signup />
            </ProtectedRoute>
          ),
        },
        {
          path: "blogs",
          element: <Blogs />,
          loader: blogsLoader,
        },
        {
          path: "blogs/blog/:blogId",
          element: (
            <ProtectedRoute authentication>
              <Blog />
            </ProtectedRoute>
          ),
          loader: blogLoader,
        },
        {
          path: "my-blogs",
          element: (
            <ProtectedRoute authentication>
              <MyBlogs />
            </ProtectedRoute>
          ),
          loader: myBlogLoader,
        },
        {
          path: "my-blogs/blog/:blogId/edit",
          element: (
            <ProtectedRoute authentication>
              <Write />
            </ProtectedRoute>
          ),
          loader: blogLoader,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </Provider>
);
