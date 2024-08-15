import { Link } from "react-router-dom";
import "../css/registersuccess.css";

const RegisterSuccess = () => {
  return (
    <>
      <div className="success-container">
        <h1>Registration Successful!</h1>
        <p>Your registration has been completed successfully.</p>

        <Link to='/' > <button className="backBtn red">Back</button> </Link>
      </div>

    </>
  );
};

export default RegisterSuccess;
