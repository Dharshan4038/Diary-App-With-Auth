import React from 'react'
import "./addDiary.css";
import { useParams } from 'react-router-dom';

export const AddDiary = ({postTitle,setPostTitle,postBody,setPostBody,image,setImage,handleAddSubmit}) => {
    
    const param = useParams();

    return (
        <div className='addpost'>
            <form onSubmit={(event)=>{
                event.preventDefault();
                handleAddSubmit(param.id)}} className='card addform mt-5'  >
                <h2 className='text-center' >Add Your Post</h2>
                <div className="mb-3 mx-5">
                    <label  className="col-sm-2 col-form-label">Title:</label>
                    <div className="col-sm-10">
                    <input type="text"  style={{width: "100%"}} value={postTitle} onChange={(e)=> setPostTitle(e.target.value)} required />
                    </div>
                </div>
                <div className="mb-3 mx-5">
                    <label className="col-sm-2 col-form-label">Post:</label>
                    <div className="col-sm-10">
                        <textarea value={postBody} onChange={(e)=> setPostBody(e.target.value)} cols="30" rows="10" style={{width: "100%",resize:"none"}} required></textarea>
                    </div>
                </div>
                <div className="mb-3 mx-5">
                <input style={{border:"none"}} onChange={(e)=>setImage(e.target.files[0])} type="file" />
                </div>
                <button type="submit" className="btn btn-primary mx-5 mt-1 btn-lg">Post</button>
            </form>
        </div>
    )
}
