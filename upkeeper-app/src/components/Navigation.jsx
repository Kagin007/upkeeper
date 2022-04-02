import { Fragment, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useSignUpModal from "../hooks/useSignUpModal";
import useLoginModal from "../hooks/useLoginModal";
import Backdrop from "./Backddrop";
import SignUpWizard from "./SignUpWizard";
import LoginModal from "./LoginModal";
import { authContext } from "../providers/AuthProvider";
import axios from "axios";

const Navigation = ({ toasterFunction }) => {
  const { user, logout, setUser } = useContext(authContext);

  const { signUpWizardOpen, toggleSignUpWizard } = useSignUpModal();

  const { loginOpen, toggleLogin } = useLoginModal();

  const exit = () => {
    axios
      .get("/api/logout")
      .then(() => {
        logout();
        toasterFunction(`Have a good one!`);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log("found user", foundUser);
      setUser(foundUser);
    }
  }, []);

  const GetProfile = user => {
    useEffect(() => {
      if (!user) {
        console.log("Please login");
      } else {
        axios
          .get(`/api/properties/${user}`)
          .then(res => {
            console.log("get property details:", res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const navColour = {
    color: "#f3e9dd",
  };

  return (
    <Fragment>
      <nav className="nav__bar">
        <h1 className="nav__logo">upKeeper</h1>
      </nav>
      <ul className="nav__options">
        <NavLink to="/" className="nav__options--link" style={navColour}>
          <b>Home</b>
        </NavLink>
        <NavLink
          to="/reservations"
          className="nav__options--link"
          style={navColour}
        >
          <b>My Reservations</b>
        </NavLink>
        <NavLink to="/profile" className="nav__options--link" style={navColour}>
          <b>My Profile</b>
        </NavLink>
        {!user && (
          <li
            to="#"
            className="nav__options--link"
            onClick={toggleLogin}
            style={navColour}
          >
            <b>Log In</b>
          </li>
        )}
        {!user && (
          <li
            to="#"
            className="nav__options--link"
            onClick={toggleSignUpWizard}
            style={navColour}
          >
            <b>Sign Up</b>
          </li>
        )}
        {user && (
          <li className="nav__options--link" style={navColour}>
            <b>Logged in as:{" "}
            <i>{`${user.username[0].toUpperCase()}${user.username
              .substring(1, user.username.length)
              .toLowerCase()}`}</i></b>
          </li>
        )}
        {user && (
          <li
            to="#"
            className="nav__options--link"
            onClick={() => exit()}
            style={navColour}
          >
            <b>Logout</b>
          </li>
        )}
      </ul>
      {signUpWizardOpen && <Backdrop onClose={toggleSignUpWizard} />}
      {signUpWizardOpen && <SignUpWizard onClose={toggleSignUpWizard} />}

      {loginOpen && <Backdrop onClose={toggleLogin} />}
      {loginOpen && (
        <LoginModal onClose={toggleLogin} toasterFunction={toasterFunction} />
      )}
    </Fragment>
  );
};

export default Navigation;
