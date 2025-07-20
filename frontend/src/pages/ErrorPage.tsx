import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="grid min-h-screen place-content-center">
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold opacity-10 lg:text-7xl xl:text-9xl">
              Error
            </h1>
            <p className="mb-5">Not Found</p>
            <Link className="btn btn-outline" to="/">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
