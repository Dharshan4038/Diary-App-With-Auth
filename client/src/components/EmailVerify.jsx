import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import success from '../images/success.png';
import axios from 'axios';

export const EmailVerify = () => {

    const [validUrl,setValidUrl] = useState(false);
    const { id, token } = useParams();
        
    const navigate = useNavigate();

    function handleClick() {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8080/api/users/${id}/verify/${token}`;
                const { data } = await axios.get(url);
                console.log("here is data:", data);
                setValidUrl(true);
                console.log(validUrl);
              } 
              catch (error) {
                console.log("this is error: ", error.message);
                setValidUrl(false);
              }
        };
        verifyEmailUrl();
        navigate("/login");
    }


    return (
        <React.Fragment>
               <div className='verify-container'>
                    <img src={success} className='success-img' alt="success" />
                    <h1>Email verified successfully !</h1>
                    <button className='btn btn-success btn-lg' onClick={handleClick} >Login</button>
               </div> 
        </React.Fragment>
    )
}
