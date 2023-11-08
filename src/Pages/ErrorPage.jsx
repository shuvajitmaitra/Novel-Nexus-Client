import { Link } from "react-router-dom";


const ErrorPage = () => {

  return (
    <div className="group">
      <div className="h-screen relative overflow-hidden bg-ErrorBg bg-no-repeat bg-cover bg-center">
        <div className="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link to='/'>
          <button className="btn btn-primary text-white py-2 px-5">back home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
