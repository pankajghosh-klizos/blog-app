import { Container, BlogEditor, Loader } from "../../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/service.js";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { renderToStaticMarkup } from "react-dom/server";
import "./Write.scss";

const Write = () => {
  const { blog } = useLoaderData() || {};
  const isAuthor = blog?.$permissions[2].includes("delete");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: blog?.title || "",
      slug: blog?.$id || "",
      body: renderToStaticMarkup(blog?.body) || "",
      status: blog?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [loading, setLoading] = useState(false);

  const submitBlog = async (data) => {
    setLoading(true);
    if (blog) {
      const { title, status } = blog;

      try {
        const updatedBlog = await appwriteService.updatePost(blog?.$id, {
          title,
          body: data?.body,
          status,
        });

        if (updatedBlog) {
          toast.success("Blog updated successfully");
          navigate(`/blogs/blog/${updatedBlog.$id}`);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error updating blog");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const newBlog = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (newBlog) {
          toast.success("Blog created successfully");
          navigate(`/blogs/blog/${newBlog.$id}`);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error creating blog");
      } finally {
        setLoading(false);
      }
    }
  };

  const slugGenerate = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  const deleteBlog = async () => {
    setLoading(true);
    try {
      const deletedBlog = await appwriteService.deletePost(blog?.$id);
      if (deletedBlog) {
        toast.success("Blog deleted successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugGenerate(value?.title, {
            shouldValidate: true,
          })
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugGenerate, setValue]);

  return (
    <div className="py-5">
      <Container>
        {isAuthor && (
          <div className="mb-5 d-flex align-itmes-center">
            <p className="w-100">
              If you want to delete this blog, please click on the delete button
            </p>

            <button
              type="button"
              onClick={deleteBlog}
              className="btn btn-primary bg-dark border-0 py-2 d-flex align-items-center gap-2 justify-content-center publish-btn px-5"
              disabled={loading}
            >
              Delete {loading && <Loader data-bs-theme="dark" />}
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(submitBlog)}>
          <div className="d-md-flex gap-3">
            <div className="mb-3 flex-grow-1">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                id="title"
                aria-describedby="titleHelp"
                {...register("title", { required: true })}
              />
              <div className="form-text text-danger">
                {errors.title && "title is required"}
              </div>
            </div>

            <div className="mb-3 flex-grow-1">
              <label htmlFor="slug" className="form-label">
                Blog Id
              </label>
              <input
                type="text"
                className="form-control"
                id="slug"
                placeholder="slug"
                disabled
                aria-describedby="titleHelp"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugGenerate(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              <div className="form-text text-danger">
                {errors.title && "slug is required"}
              </div>
            </div>
          </div>

          <BlogEditor
            control={control}
            defaultValue={getValues("body")}
            className="mb-3"
          />

          <div className="d-flex gap-2 mb-5 justify-content-end">
            <button
              type="submit"
              className="btn btn-primary bg-dark border-0 py-2 d-flex align-items-center gap-2 justify-content-center px-5"
              disabled={loading}
            >
              Publish {loading && <Loader data-bs-theme="dark" />}
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Write;
