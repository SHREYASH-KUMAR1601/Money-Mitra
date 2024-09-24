import React, { useState } from 'react'; // Add useState for form data
import Heading from '../Components/Heading';
import InputBox from '../Components/InputBox';
import SubHeading from '../Components/SubHeading';
import {Button} from '../Components/Button';
import { useNavigate } from 'react-router-dom';
import BottomWarning from '../Components/BottomWarning';
import axios from 'axios'; // Import axios for API calls

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await axios.post('/api/v1/user/signin', formData);
      localStorage.setItem('token', response.data.token); // Store the token
      navigate('/dashboard'); // Redirect on success
    } catch (error) {
      setError(error.response?.data?.message || "Error signing in"); // Set error message
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign in"/>
          <SubHeading label="Enter your credentials" /> {/* Updated label */}

          {error && <p className="text-red-500">{error}</p>} {/* Display error */}

          <form onSubmit={handleSubmit}>
            <InputBox type="email" name="email" placeholder="harkirat@gmail.com" label="Email" onChange={handleInputChange} />
            <InputBox type="password" name="password" placeholder="123456" label="Password" onChange={handleInputChange} />
            <div className="pt-4">
              <Button type="submit" label="Sign in" />
            </div>
          </form>
          <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
        </div>
      </div>
    </div>
  );
}

export default Signin;
