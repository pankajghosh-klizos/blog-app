import { useNavigate } from "react-router-dom";
import "./Card.scss";

const Card = ({ id, title, body, isAuthor = false }) => {
  const navigate = useNavigate();
  return (
    <div className="card w-100 h-100 shadow border-1 p-2 rounded-3 position-relative">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title playfair text-capitalize">{title}</h4>
        <p className="card-text flex-grow-1">
          <span className="truncate">{body}</span>
        </p>
        <button
          className="w-100 bg-dark btn btn-primary border-0 rounded-3"
          onClick={() => navigate(`/blogs/blog/${id}`)}
        >
          read more
        </button>
      </div>

      {isAuthor && (
        <div className="d-flex gap-1 position-absolute top-0 end-0">
          <button
            type="button"
            className="btn btn-primary rounded bg-dark border-0 px-3 d-flex align-items-center gap-2 justify-content-center w-100"
            onClick={() => navigate(`/my-blogs/blog/${id}/edit`)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
