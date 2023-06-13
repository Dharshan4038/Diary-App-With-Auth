import React, { useEffect, useState } from 'react'
import "./adminpage.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';


const AdminPage = () => {
    const [allUsers,setAllUsers] = useState([]);
    const [appUsers,setAppUsers] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/getAllUsers");
                const users = response.data;
                setAllUsers(users);
            } catch(err) {
                if(err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.header);
                } 
                else {
                    console.log(`Error: ${err.message}`);
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchUsers();
    },[]);

    useEffect(()=>{
        const filteredResults = allUsers.filter((user)=>{
            return user.email !== "dharshand9@gmail.com";
        })
        setAppUsers(filteredResults);
    },[allUsers])

    const handleClick = async (id) => {
        try {
            if(window.confirm("Are you sure you want to delete ?")) {
                console.log("asd");
                const response = await axios.delete(`http://localhost:8080/deleteuser/${id}`);
                alert("User deleted Successfully !!");
                console.log(response);
                window.location.reload();
            }
        }
        catch(err) {
            if(err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            } 
            else {
                console.log(`Error: ${err.message}`);
            }
        }
    }

    const handleLogOutClick = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            <Header handleClick={handleLogOutClick} />
            {isLoading && <p style={{textAlign: "center"}}>Loading items...</p> }
            {!isLoading && 
                <div className='container mt-5'>
                    <h2 className='text-center'>Welcome Back Admin</h2>
                    <h5 className='mt-3 mb-5'>No of users registered: {appUsers.length}</h5>
                    <div className='admin'>
                        <table className='text-center table table-striped mt-5'>
                            <thead>
                                <tr>
                                    <th className='bg-dark text-white'>First Name</th>
                                    <th className='bg-dark text-white'>Last Name</th>
                                    <th className='bg-dark text-white'>Email</th>
                                    <th className='bg-dark text-white'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appUsers.map((user)=>{
                                    return (
                                        <tr key={user._id} >
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Link to={`/userpost/${user._id}`} >
                                                    <button className='btn btn-success mx-3'>View</button>
                                                </Link>                                    
                                                <button className='btn btn-danger' onClick={()=>handleClick(user._id)}>Remove</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                }
        </>
       
  )
}

export default AdminPage