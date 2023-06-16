import React,{ useState,useEffect } from 'react'
import Header from './Header';
import "./mainpage.css";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const MainPage = ({allDiaries,setAllDiaries}) => {

    const [logUser,setLogUser] = useState("");
    const [isLoading,setIsLoading] = useState(true);
    const {id} = useParams();

    useEffect(()=>{
        const fetchDiary = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/diary/${id}`);
                
                const diaries = response.data.diary;
                const userName = response.data.firstName;
                setLogUser(userName);
                setAllDiaries(diaries);
            }
            catch(error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDiary();
    },[id,setAllDiaries])

    const handleClick = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete ?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/diary/${id}`);
                console.log(response);
                window.location.reload();
            } 
            catch(err) {
                console.log(err);
            }
        }
    }


    return (
        <div>
            <Header handleClick={handleClick} />
            {isLoading && <p style={{textAlign: "center"}}>Loading items...</p> }
            {!isLoading && 
                <div>
                    <h2 className='text-center mt-2' >Welcome {logUser} </h2>
                    <div className='btn-div'>
                        <Link to ={`/diary/${id}/addpost`}>
                            <button className='btn btn-success btn-diary'>Add Diary</button>
                        </Link>
                    </div>
                    {(allDiaries.length) ? (
                        allDiaries.map((diary)=>{
                            return (
                                <div key={diary._id}  className='card diary'>
                                    <div className='img-div' >
                                         <img style={{width:"150px",height:"150px"}} src={`http://localhost:8080/${diary?.imageUrl}`} alt='' />
                                    </div>
                                    <div>
                                        <h1>{diary.title}</h1>
                                        <p>{diary.post}</p>
                                        <div className='post-btn' >
                                            <button onClick={()=>handleDelete(diary._id)}  className='btn dlt-btn btn-danger' ><i className="bi bi-trash-fill"></i></button>
                                            <Link to={`/editdiary/${diary._id}`} >
                                                <button className='btn btn-info' ><i className="bi bi-pencil-square"></i></button>
                                            </Link>                                       
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ): (
                        <h2 className='text-center'>No Diaries to display...</h2>
                    )}
                </div>
            }
        </div>
    )
}

export default MainPage;