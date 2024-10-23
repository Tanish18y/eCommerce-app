import React, { useEffect, useState } from "react";

let Register = (props) => {
  let [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    gender: "",
    country: "",
    recieveletters: "",
  });
  let [countries] = useState([
    { id: 1, countryName: "India" },
    { id: 2, countryName: "USA" },
    { id: 3, countryName: "UK" },
    { id: 4, countryName: "Japan" },
    { id: 5, countryName: "South Africa" },
    { id: 6, countryName: "NewZealand" },
    { id: 7, countryName: "Australia" },
  ]);
  let [errors, setErrors] = useState({
    email: [],
    password: [],
    name: [],
    dob: [],
    gender: [],
  });
  let [dirty, setDirty] = useState({
    email: false,
    password: false,
    name: false,
    dob: false,
    gender: false,
    country: false,
    recieveletters: false,
  });
  let [message, setMessage] = useState("");
  let validate = () => {
    let errorsData = {};
    //email
    errorsData.email = [];
    //email can't be blank
    if (!state.email) {
      errorsData.email.push("Email can't be blank");
    }
    //email regex
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (state.email) {
      if (!validEmail.test(state.email)) {
        errorsData.email.push("Email is not valid");
      }
    }
    //password
    errorsData.password = [];
    //password can't be blank
    if (!state.password) {
      errorsData.password.push("Password can't be blank");
    }
    //password regex
    
    if (state.password) {
      if (!validPassword.test(state.password)) {
        errorsData.password.push("Password is not valid");
      }
    }

    setErrors(errorsData);
  };
  useEffect(validate, [state]);
  useEffect(() => {
    document.title = "Register-eCommerce";
  }, []);
  let onRegister = async () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);
    validate();
    if (isValid()) {
      setMessage(<span className="text-success">Success</span>);
      let response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          name: state.name,
          dob: state.dob,
          gender: state.gender,
          country: state.country,
          recieveletters: state.recieveletters,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        setMessage(
          <span className="text-success">Successfully Registered</span>)
          props.history.replace("/dashboard")
        
      } else {
        setMessage(<span className="text-danger">Error in database</span>);
      }
    } else {
      setMessage(<span className="text-danger">Errors</span>);
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
    <div className="row">
      <div className=" col-lg-6 col-md-7 mx-auto">
        <div className="card border-primary shadow my-2">
          <div className="card-header border-bottom border-primary">
            <h4
              style={{ fontSize: "40px" }}
              className="text-primary text-center"
            >
              Register
            </h4>
            <ul className="text-danger">
              {Object.keys(errors).map((control) => {
                if (dirty[control]) {
                  return errors[control].map((err) => {
                    return <li key={err}>{err}</li>;
                  });
                } else {
                  return "";
                }
              })}
            </ul>
          </div>
          <div className="card-body  border-primary">
            {/*email starts*/}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="email">
                Email
              </label>
              <div className="col-lg-8">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={state.email}
                  onChange={(event) => {
                    setState({ ...state, email: event.target.value });
                  }}
                />
              </div>
            </div>
            {/* email ends */}
            {/*password starts*/}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="password">
                Password
              </label>
              <div className="col-lg-8">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={state.password}
                  onChange={(event) => {
                    setState({ ...state, password: event.target.value });
                  }}
                />
              </div>
            </div>
            {/* password ends */}
            {/*name starts*/}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="name">
                Name
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={state.name}
                  onChange={(event) => {
                    setState({ ...state, name: event.target.value });
                  }}
                />
              </div>
            </div>
            {/* name ends */}
            {/*dob starts*/}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="dob">
                Date Of Birth
              </label>
              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  id="dob"
                  value={state.dob}
                  onChange={(event) => {
                    setState({ ...state, dob: event.target.value });
                  }}
                />
              </div>
            </div>
            {/* dob ends */}
            {/*gender starts*/}
            <div className="form-group form-row">
              <label className="col-lg-4">Gender</label>
              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    className="form-check-input"
                    checked={state.gender === "male"}
                    onChange={(event) => {
                      setState({ ...state, gender: event.target.value });
                    }}
                  />
                  <label className="form-check-inline" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    className="form-check-input"
                    checked={state.gender === "female"}
                    onChange={(event) => {
                      setState({ ...state, gender: event.target.value });
                    }}
                  />
                  <label className="form-check-inline" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
            {/* gender ends */}
            {/*country starts*/}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="country">
                Country
              </label>
              <div className="col-lg-8">
                <select
                  className="form-control"
                  name="country"
                  id="country"
                  value={state.country}
                  onChange={(event) => {
                    setState({ ...state, country: event.target.value });
                  }}
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.countryName}>
                      {country.countryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* country ends */}
            {/*recieveletters starts*/}
            <div className="form-group form-row">
              <label className="col-lg-4"></label>
              <div className="col-lg-8">
                <input
                  type="checkbox"
                  name="recieveletters"
                  value="true"
                  id="recieveletters"
                  className="form-check-input"
                  checked={state.recieveletters === true}
                  onChange={(event) => {
                    setState({
                      ...state,
                      recieveletters: event.target.checked,
                    });
                  }}
                ></input>
                <label className="form-check-inline" htmlFor="recieveletters">
                  Recieve News Letter
                </label>
              </div>
            </div>
            {/* recieveletters ends */}
          </div>
          {/* footer starts */}
          <div className="card-footer text-center">
            <div className="m-1">{message}</div>
            <div>
              <button className="btn btn-primary m-2" onClick={onRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
