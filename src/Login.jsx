import React, { useState, useEffect } from "react";
let Login = (props) => {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });
  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });
  let [loginMessage, setLoginMessage] = useState("");
  useEffect(() => {
    console.log(email, password);
  });
  useEffect(() => {
    if (email.indexOf("@") > 0) {
      console.log("valid");
    } else {
      console.log("invalid");
    }
  }, [email]);
  useEffect(() => {
    document.title = "Login-eCommerce";
  }, []);
  let validate = () => {
    let errorsData = {};
    //email
    errorsData.email = [];
    if (!email) {
      errorsData.email.push("Email can't be blank");
    }
    let validEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (email) {
      if (!validEmail.test(email)) {
        errorsData.email.push("Proper email is required");
      }
    }
    setErrors(errorsData);
  };
  useEffect(validate, [email, password]);
  let onLogin = async () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);
    validate();
    if (isValid()) {
      let response = await fetch(
        `http://localhost:3000/users?email=${email}&password=${password}`,
        { method: "GET" }
      );
      if (response.ok) {
        let responseBody = await response.json();
        if (responseBody.length > 0) {
          props.history.replace("/dashboard");
        } else {
          setLoginMessage(
            <span className="text-danger">Invalid Login,please try again</span>
          );
        }
      } else {
        setLoginMessage(
          <span className="text-danger">Unable to connect to server</span>
        );
      }
    }
  };
  let isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
    return valid;
  };
  return (
    <div className=" row justify-content-center ">
      <div className="col-lg-5  col-md-7 ">
        <div className="card border-success shadow my-2  ">
          <div className="card-header border-bottom border-success text-center">
            <h4
              style={{ fontSize: "40px" }}
              className="text-success text-center"
            >
              Login
            </h4>
          </div>
          <div className="card-body border-bottom login-card border-success">
            {/* email start */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                onBlur={() => {
                  setDirty({ ...dirty, email: true });
                  validate();
                }}
                placeholder="Email"
              />
            </div>
            {/* email ends */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onBlur={() => {
                  setDirty({ ...dirty, password: true });
                  validate();
                }}
              />
            </div>
          </div>
          <div className="card-footer text-center">
            <div className="m-1"></div>
            <div>
              <button className="btn btn-success m-2">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
