import React , {useEffect, useState} from 'react'


let Register=() =>{
    let[state,setState]=useState({
        email:"",
        password:"",
        name:"",
        dob:"",
        gender:"",
        country:"",
        recieveletters:""
    });
    useEffect(()=>{
        document.title="Register-eCommerce";
    },[]);
  return (
        <div className='row'>
            <div className='col-lg-6 mx-auto'>
                <h4>Register</h4>
                {/*email starts*/}
                <div className='form-group form-row'>
                    <label className='col-lg-4'>Email</label>
                    <div className="col-lg-8">
                        <input type="text" className='form-control' />
                    </div>
                </div>
                {/* email ends */}
            </div>
            
        </div>
  );
}

export default Register