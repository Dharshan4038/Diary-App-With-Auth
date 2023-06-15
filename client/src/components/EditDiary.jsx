import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const EditDiary = ({allDiaries,editTitle,editBody,setEditTitle,setEditBody,handleEditSubmit}) => {
    
    const {id} = useParams();
    const diary = allDiaries.find((diary)=>(diary._id)===id);


    useEffect(()=>{
        if(diary) {
            setEditTitle(diary.title);
            setEditBody(diary.post);
        }
    },[diary,setEditTitle,setEditBody]);


    return (
        <div className='addpost'>
            <form onSubmit={(event)=>{
                    event.preventDefault();
                    }} className='card addform mt-5'  >
                    <h2 className='text-center' >Edit Your Post</h2>
                    <div className="mb-3 mx-5">
                        <label  className="col-sm-2 col-form-label">Title:</label>
                        <div className="col-sm-10">
                        <input type="text"  style={{width: "100%"}} value={editTitle} onChange={(e)=> setEditTitle(e.target.value)} required />
                        </div>
                    </div>
                    <div className="mb-3 mx-5">
                    <label className="col-sm-2 col-form-label">Post:</label>
                    <div className="col-sm-10">
                        <textarea value={editBody} onChange={(e)=> setEditBody(e.target.value)} cols="30" rows="10" style={{width: "100%",resize:"none"}} required></textarea>
                    </div>
                    </div>
                    <button type="submit" className="btn btn-primary mx-5 mt-3 btn-lg" onClick={()=>handleEditSubmit(id)} >Update</button>
                </form>
        </div>
   )
}

export default EditDiary