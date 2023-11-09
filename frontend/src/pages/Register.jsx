import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Button, Input } from "@nextui-org/react";

function Register({ setProgress }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
      setProgress(100);
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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      setProgress(100);

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center h-screen m-10">
      <form
        style={{ marginLeft: "10px", padding: "40px" }}
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 py-8 w-64"
      >
        <h3 className="font-semibold text-center text-2xl mb-4">Register</h3>

        <div style={{ margin: "10px", padding: "4px" }}>
          <Input
            isClearable
            type="text"
            className="w-full"
            // className="form-input"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
        </div>
        <div style={{ margin: "10px", padding: "4px" }}>
          <Input
            type="email"
            // className="form-input"
            className="w-full"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
        </div>
        <div style={{ margin: "10px", padding: "4px" }}>
          <Input
            type="password"
            className="form-input"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
          />
        </div>
        <div style={{ margin: "10px", padding: "4px" }}>
          <Input
            type="password"
            className="form-input"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
          />
        </div>
        <div style={{ margin: "10px", padding: "4px" }}>
          <Button type="submit" color="success" className="w-full">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
