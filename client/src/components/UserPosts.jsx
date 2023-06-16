import React, { useEffect,useState } from 'react';
import "./userposts.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserPosts = () => {

    const {id} = useParams();
    const[user,setUser] = useState([]);
    const [userDiaries,setUserDiaries] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=> {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getuserdiaries/${id}`);
                const newUser = response.data;
                setUser(newUser);
                const email = newUser.email;
                const res = await axios.get(`http://localhost:8080/getposts/${email}`);
                const diaries = res.data.diary;
                setUserDiaries(diaries);
            }
            catch(error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }  
        fetchUser();
    },[id]);

    return (
        <div>
            {isLoading && <p style={{textAlign: "center"}}>Loading items...</p> }
            {!isLoading &&
                <div className='post mt-5' >
                    <h2 className='text-center mb-5' >{user.firstName}'s Post</h2>
                    {(userDiaries.length) ? (
                        userDiaries.map((diary,index) => {
                            return (
                                <div key={index} className='card cd mb-3'>
                                    <div className='img-div'>
                                        <img style={{width:"150px",height:"150px"}} src={`http://localhost:8080/${diary?.imageUrl}`} alt='' />
                                    </div>
                                    <div>
                                        <h1>{diary.title}</h1>
                                        <p>{diary.post}</p>
                                    </div>
                                </div>
                            )
                        })
                    ):(
                        <h4>No posts yet...</h4>
                    )}
                </div>
            }
        </div>
    )
}

export default UserPosts