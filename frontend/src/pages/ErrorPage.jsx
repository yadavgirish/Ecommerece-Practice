import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 px-4">
      {/* Error Code Card */}
      <div className="bg-white shadow-md rounded-lg p-10 text-center max-w-sm w-full">
        <h1 className="text-6xl font-bold text-pink-600 mb-4">404</h1>
        <p className="text-gray-700 text-lg mb-6">
          Sorry! The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-500 transition-colors"
        >
          Go Back Home
        </button>
      </div>

      {/* Optional Suggestion / Links */}
      <div className="mt-6 text-gray-600 text-sm text-center max-w-sm">
        <p>Or try visiting one of these pages:</p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => navigate("/collection")}
            className="text-pink-600 hover:underline text-sm"
          >
            Collection
          </button>
          <button
            onClick={() => navigate("/about")}
            className="text-pink-600 hover:underline text-sm"
          >
            About
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="text-pink-600 hover:underline text-sm"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
