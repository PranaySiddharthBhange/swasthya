import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

import { Button, Input } from "@nextui-org/react";

function Login({ setProgress }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setProgress(100);
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center h-screen m-10">
      <form
        style={{ marginLeft: "10px", padding: "40px" }}
        className="bg-white shadow-md rounded px-8 py-8 w-64"
        onSubmit={onSubmit}
      >
        <h3 className="font-semibold text-center text-2xl mb-4">Log In</h3>

        <div style={{ margin: "10px", padding: "4px" }}>
          <Input
            isClearable
            type="email"
            className="w-full"
            id="email"
            name="email"
            value={email}
            variant="bordered"
            placeholder="Enter your email"
            onChange={onChange}
          />
        </div>

        <div style={{ margin: "10px", padding: "4px" }}>
          <Input
            isClearable
            type="password"
            id="password"
            name="password"
            value={password}
            variant="bordered"
            placeholder="Enter your password"
            className="w-full"
            onChange={onChange}
          />
        </div>

        <div style={{ margin: "10px", padding: "4px" }}>
          <Button type="submit" color="success" className="w-full">
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
