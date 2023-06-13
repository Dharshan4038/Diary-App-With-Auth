import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [data,setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    
    const [error,setError] = useState("");
    const [msg,setMsg] = useState("");
    
    

    function handleChange(event) {
        const {name,value} = event.target;
        setData({...data,[name]:value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const URL = "http://localhost:8080/api/users";
            const {data: res} = await axios.post(URL,data);
            setMsg(res.message);
        } 
        catch(error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        } 
    }

    
return (
    <div className='signup-container'>
        <div className="card signup-card">
            <div className="card-body">
                <h2 className='text-center'><i className="bi bi-person-circle"></i></h2>
                <h2 className='text-center'>Create Your Account</h2>
                <form className='mt-5' onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="FirstName" className="form-label">First Name:</label>
                        <input type="text" className="form-control" name='firstName' onChange={handleChange}  value={data.firstName} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="LastName" className="form-label">Last Name:</label>
                        <input type="text" className="form-control" name='lastName' onChange={handleChange} value={data.lastName} required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
                        <input type="email" className="form-control" name='email' onChange={handleChange} value={data.email} required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
                        <input type="password" className="form-control" name='password' onChange={handleChange} value={data.password} required  />
                    </div>
                    {error && <div className='error-msg'>
                        <i class="bi bi-x-circle-fill"></i> {error}
                    </div>  }
                    {msg && <div className='success-msg'>
                        <i class="bi bi-check-circle-fill"></i> {msg}
                    </div>  }
                    <button type="submit" className="btn btn-primary mt-4" style={{width:"100%" }}>Sign Up</button>
                    <p className='mt-2 text-center' >Already have an account ?<Link to="/login" className='link' > Login </Link> </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup