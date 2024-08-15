import '../css/registerForm.css';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const formValidation = () => {
    const validationErrors = {};
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 7) {
      validationErrors.password = "Password should be at least 8 characters";
    } else if (!specialCharRegex.test(password)) {
      validationErrors.password = "Password should include at least one special character (!@#$%^&*)";
    } else if (!numberRegex.test(password)) {
      validationErrors.password = "Password should include at least one number";
    } else if (!upperCaseRegex.test(password)) {
      validationErrors.password = "Password should include at least one uppercase letter";
    } else if (!lowerCaseRegex.test(password)) {
      validationErrors.password = "Password should include at least one lowercase letter";
    }

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    navigate('/registrationSuccess');

    // Validate form before making API request
    if (!formValidation()) {
      return;
    }

    try {
      const result = await axios.post('http://localhost:8000/register', { name, email, password });
      console.log(result);
      navigate('/registrationSuccess');
    } catch (err) {
      console.error(err);
    }
  };

  const clearInputs = (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  return (
    <div className="register">
      <div className="signup-container mt-5 mb-4">
        <h2>Register</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <span className="errMsg" style={{ color: 'red' }}>{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <span className="errMsg">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="*****"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <span className="errMsg">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="*****"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && <span className="errMsg">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="signup-button">Submit</button>
          <button className="signup-button clearBtn red" onClick={clearInputs}>Reset</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
