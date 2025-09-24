import { Header } from "../components/Header";
import './ErrorPage.css';
export function ErrorPage(){
  return (
    <>
      <title>Error 404</title>
      <Header />
      <h1
        className="error-message"
      >Error 404 </h1>
    </>
  );
}