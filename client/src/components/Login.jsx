import React from 'react'


import { Link } from 'react-router-dom';

const Login = ({data,setData,error,handleSubmit }) => {
   
    function handleChange(event) {
        const {name,value} = event.target;
        setData({...data,[name]:value});
    }

return (
    <div className='login-container'>
        <div className="card login-card">
            <div className="card-body">
                <h2 className='text-center'><i className="bi bi-person-circle"></i></h2>
                <h2 className='text-center'>Login to Your Account</h2>
                <form className='mt-5' onSubmit={handleSubmit} >
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
                    <button type="submit" className="btn btn-primary mt-4" style={{width:"100%",fontSize:"18px" }}>Login</button>
                    <p className='mt-3 text-center' >Don't have an account ?<Link to="/signup" className='link' > Sign Up </Link> </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login;