import React ,{useState , useEffect} from "react"
let Login =()=>{
    var[email,setEmail]=useState("")
    var[password,setPassword]=useState("");
    useEffect(()=>{
        console.log(email , password);
    });
    useEffect(()=>{
        if(email.indexOf("@")>0){
            console.log("valid");
        }
        else{
            console.log("invalid");
        }
    },[email])
    useEffect(()=>{
        document.title="Login-eCommerce";
    },[]);
    return (
        <div className=" card  ">
            <div className="col-lg-5  col-md-7 mx-auto  ">
                <div className="card-border-success shadow-lg-my-2 login-card ">
                    <div className="card-header border-bottom border-success login-card ">
                        <h4 style={{fontSize:"40px"}} className="text-success text-center">Login</h4>
                    </div>
                    <div className="card-body border-bottom login-card border-success">
                        {/* email start */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email"/>
                        </div>
                        {/* email ends */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" id="password" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login