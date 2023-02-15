import { useRouteError } from "react-router-dom";

const ErrorUrlPage = () => {
  const error = useRouteError();

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <h1 className="text-center text-5xl">Oops!</h1>
        <p className="my-6 text-center">
          Désolé, une erreur inattendue s'est produite.
        </p>
        <p className="text-center text-gray-500">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorUrlPage;
