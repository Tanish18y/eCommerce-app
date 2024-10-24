import React, { useEffect, useState } from "react";

const Register = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    gender: "",
    country: "",
    recieveletters: false,
  });
  const [countries] = useState([
    { id: 1, countryName: "India" },
    { id: 2, countryName: "USA" },
    { id: 3, countryName: "UK" },
    { id: 4, countryName: "Japan" },
    { id: 5, countryName: "South Africa" },
    { id: 6, countryName: "New Zealand" },
    { id: 7, countryName: "Australia" },
  ]);
  const [errors, setErrors] = useState({
    email: [],
    password: [],
    name: [],
    dob: [],
    gender: [],
  });
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
    name: false,
    dob: false,
    gender: false,
    country: false,
    recieveletters: false,
  });
  const [message, setMessage] = useState("");

  const validate = () => {
    let errorsData = { email: [], password: [], name: [], dob: [], gender: [] };

    if (!state.email) {
      errorsData.email.push("Email can't be blank");
    }
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (state.email && !validEmail.test(state.email)) {
      errorsData.email.push("Email is not valid");
    }

    if (!state.password) {
      errorsData.password.push("Password can't be blank");
    } else if (state.password.length < 6) {
      errorsData.password.push("Password must be at least 6 characters long");
    }

    if (!state.name) {
      errorsData.name.push("Name can't be blank");
    }

    if (!state.dob) {
      errorsData.dob.push("Date of birth can't be blank");
    }

    if (!state.gender) {
      errorsData.gender.push("Gender is required");
    }

    setErrors(errorsData);
  };

  useEffect(validate, [state]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDirty({
      email: true,
      password: true,
      name: true,
      dob: true,
      gender: true,
      country: true,
      recieveletters: true,
    });
    validate();

    if (isValid()) {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        });

        if (response.ok) {
          const result = await response.json();
          setMessage(<span className="text-success">Registration successful!</span>);
          // Optionally redirect or reset form here
          setState({
            email: "",
            password: "",
            name: "",
            dob: "",
            gender: "",
            country: "",
            recieveletters: false,
          });
        } else {
          setMessage(<span className="text-danger">Registration failed. Please try again.</span>);
        }
      } catch (error) {
        setMessage(<span className="text-danger">An error occurred: {error.message}</span>);
      }
    }
  };

  const isValid = () => {
    return Object.values(errors).every(errArray => errArray.length === 0);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7">
        <div className="card border-success shadow my-2">
          <div className="card-header border-bottom border-success text-center">
            <h4 className="text-success">Register</h4>
          </div>
          <div className="card-body border-bottom login-card border-success">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  onBlur={() => setDirty({ ...dirty, name: true })}
                />
                {dirty.name && errors.name.map((error, index) => (
                  <span key={index} className="text-danger">{error}</span>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  onBlur={() => setDirty({ ...dirty, email: true })}
                  placeholder="Email"
                />
                {dirty.email && errors.email.map((error, index) => (
                  <span key={index} className="text-danger">{error}</span>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  onBlur={() => setDirty({ ...dirty, password: true })}
                />
                {dirty.password && errors.password.map((error, index) => (
                  <span key={index} className="text-danger">{error}</span>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  value={state.dob}
                  onChange={handleChange}
                  onBlur={() => setDirty({ ...dirty, dob: true })}
                />
                {dirty.dob && errors.dob.map((error, index) => (
                  <span key={index} className="text-danger">{error}</span>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={state.gender}
                  onChange={handleChange}
                  onBlur={() => setDirty({ ...dirty, gender: true })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {dirty.gender && errors.gender.map((error, index) => (
                  <span key={index} className="text-danger">{error}</span>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  className="form-control"
                  id="country"
                  name="country"
                  value={state.country}
                  onChange={handleChange}
                  onBlur={() => setDirty({ ...dirty, country: true })}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.countryName}>{country.countryName}</option>
                  ))}
                </select>
                {dirty.country && errors.country && errors.country.map((error, index) => (
                  <span key={index} className="text-danger">{error}</span>
                ))}
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="recieveletters"
                    name="recieveletters"
                    checked={state.recieveletters}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="recieveletters">
                    I want to receive newsletters
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success">Register</button>
              </div>
              {message && <div className="text-center mt-3">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
