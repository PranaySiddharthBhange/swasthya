import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Button } from "@nextui-org/react";

function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="flex p-4 items-center justify-between">
      <div className="flex items-center">
        {user ? (
          <Link to="/" className="text-3xl font-semibold ml-3">
            Dashboard
          </Link>
        ) : (
          <h1 className="text-3xl font-semibold ml-3">Swasthya</h1>
        )}
      </div>
      <ul className="flex space-x-4">
        {user ? (
          <li>
            <Button color="warning" onClick={onLogout}>
              Logout
            </Button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <Button color="warning">Login</Button>
              </Link>
            </li>
            <li style={{ marginLeft: "10px" }}>
              <Link to="/register">
                <Button color="warning">Register</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
