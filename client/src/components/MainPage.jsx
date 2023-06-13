import React,{ useState,useEffect } from 'react'
import Header from './Header';
import "./mainpage.css";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const MainPage = () => {

    const [allDiaries,setAllDiaries] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const {id} = useParams();

    useEffect(()=>{
        const fetchDiary = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/diary/${id}`);
                const diaries = response.data;
                setAllDiaries(diaries);
            }
            catch(error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDiary();
    },[id])

    const handleClick = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div>
            <Header handleClick={handleClick} />
            {isLoading && <p style={{textAlign: "center"}}>Loading items...</p> }
            {!isLoading && 
                <div>
                    <div className='btn-div'>
                        <Link to ={`/diary/${id}/addpost`}>
                            <button className='btn btn-success btn-diary'>Add Diary</button>
                        </Link>
                    </div>
                    {(allDiaries.length) ? (
                        allDiaries.map((diary)=>{
                            return (
                                <div key={diary._id}  className='card diary'>
                                    <h1>{diary.title}</h1>
                                    <p>{diary.post}</p>
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