import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";

const BlogEditor = ({
  name,
  control,
  label,
  defaultValue = "",
  className = "",
}) => {
  return (
    <div className={`w-100 ${className}`}>
      {label && <label className="mb-4">{label}</label>}
      <Controller
        name={name || "body"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={config.tinyMceApiKey}
            initialValue={defaultValue}
            init={{
              referrer_policy: "origin",
              branding: false,
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default BlogEditor;
