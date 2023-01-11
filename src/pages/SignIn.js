// rfce
import React, { useState } from "react";
import axios from "axios";
import config from "../configuration.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${config.api.uri}/auth/actions/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      // ritorna i campi a stringhe vuote
      setEmail("");
      setPassword("");

      toast.success("Accesso effettuato");
      navigate("/user/dashboard");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };
  const handleForgotPassword = () => {
    toast.dismiss();

    axios
      .post(
        `${config.api.uri}/auth/actions/forgotpassword`,
        { email },
        { withCredentials: true }
      )
      .then(() => {
        setEmail("");
        toast.success("Controllare la posta elettronica");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setEmail("");
      });
  };

  return (
    <div>
      <div className="container custom_className pt-5">
        <h2 className="signup_title text-center">SIGN IN</h2>
        <form className=" col-sm-6 offset-3 pt-5 signup_form">
          <div className="form-outline mb-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="form4Example2"
              className="form-control"
              value={email}
            />
            <label className="form-label" htmlFor="form4Example2">
              Email
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="form4Example3"
              className="form-control"
              value={password}
            />
            <label className="form-label" htmlFor="form4Example3">
              Password
            </label>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary btn-block mb-4"
          >
            Login
          </button>
        </form>
      </div>
      <button
        type="button"
        className="btn btn-light"
        style={{ marginLeft: "40%" }}
        data-mdb-ripple-color="dark"
        data-mdb-toggle="modal"
        data-mdb-target="#exampleModal"
      >
        Password dimenticata
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Recupera password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="form-outline mb-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="form4Example1"
                className="form-control"
                value={email}
              />
              <label className="form-label" htmlFor="form4Example1">
                Email
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-mdb-dismiss="modal"
                onClick={(e) => setEmail("")}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-mdb-dismiss="modal"
                onClick={handleForgotPassword}
              >
                Invia mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
