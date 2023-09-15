import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function NoPage() {
  // 
  const error = useRouteError();
  const message = errorMessage(error);
  return (
    <div id="error-page">
      <h1>Oops!!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}

const errorMessage = (err: unknown):string => {
  if (isRouteErrorResponse(err)) {
    return `${err.status} ${err.statusText}`;
  } else if (err instanceof Error) {
    return err.message;
  } else if (typeof err === 'string') {
    return err;
  }
  console.error(err);
  return 'Unknown error';
};