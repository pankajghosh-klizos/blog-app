import Loader from "./Loader/Loader";

const HydrateFallback = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <Loader style={{ width: "50px", height: "50px", borderWidth: "5px" }} />
    </div>
  );
};

export default HydrateFallback;
