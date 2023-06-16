import React,{useState} from 'react';
import { Route,Routes,Navigate, useNavigate } from 'react-router-dom';
import MainPage from './MainPage';
import Signup from './Signup';
import Login from './Login';
import { EmailVerify } from './EmailVerify';
import axios from 'axios';
import "./login.css";
import { AddDiary } from './AddDiary';
import AdminPage from './AdminPage';
import UserPosts from './UserPosts';
import EditDiary from './EditDiary';

const App = () => {
  const user = localStorage.getItem("token");
  const [data,setData] = useState({
      email: "",
      password: ""
  });
  
  
  const [error,setError] = useState("");
  const [allDiaries,setAllDiaries] = useState([]);
  const [postTitle,setPostTitle] = useState("");
  const [postBody,setPostBody] = useState("");
  const [image,setImage] = useState("");
  const [editTitle,setEditTitle] = useState("");
  const [editBody,setEditBody] = useState("");
//   const [editImage,setEditImage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
      e.preventDefault();
      try {
        if(data.email !== "dharshand9@gmail.com") {
            const URL = "http://localhost:8080/api/auth";
            const {data: res} = await axios.post(URL,data);
            localStorage.setItem("token",res.data);
            const response = await axios.get(`http://localhost:8080/${data.email}`);
            const loginUser = response.data;
            navigate(`/diary/${loginUser._id}`);
        } 
        else {
            const URL = "http://localhost:8080/api/auth";
            const {data: res} = await axios.post(URL,data);
            localStorage.setItem("token",res.data);
            navigate("/admin");
            setData("");
        }
      } 
      catch(error) {
          if(error.response && error.response.status >= 400 && error.response.status <= 500) {
              setError(error.response.data.message);
          }
      }
  }

  const handleAddSubmit = async (id) => {
        const uId = id;
        try {
            const res = await axios.get(`http://localhost:8080/getUser/${uId}`);
            const userEmailId = res.data;
            // const newPost =  {emailId:userEmailId,title:postTitle,post:postBody};
            const formData = new FormData();
            formData.append('emailId',userEmailId);
            formData.append('title',postTitle);
            formData.append('post',postBody);
            formData.append('image',image);
            const response = await axios.post("http://localhost:8080/addpost",formData);
            console.log(response);
            setPostTitle("");
            setPostBody("");
            setImage("");
            navigate(`/diary/${id}`);
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

    const handleEditSubmit = async (id) => {
        const editValue = {id:id,title:editTitle,post:editBody}
        // const editFormdata = new FormData();
        // editFormdata.append('id',id);
        // editFormdata.append('title',editTitle);
        // editFormdata.append('post',editBody);
        // editFormdata.append('imageUrl',editImage);
        try {
            const response = await axios.put(`http://localhost:8080/editdiary/${id}`,editValue);
            console.log(response);
            navigate(-1);
        }
        catch(err) {
            console.log(`Error: ${err.message}`);
        }
    }
 
  return (
    <div>
        <Routes>
            {user && <Route path='/diary/:id' element={<MainPage allDiaries={allDiaries} setAllDiaries={setAllDiaries}  />} />}
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login data={data} setData={setData} error={error} handleSubmit={handleSubmit}  />} />
            <Route path='/diary/:id' element={<Navigate replace to="/login" />} />
            <Route path='/' element={<Navigate replace to="/login"/>} />
            <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
            <Route path='/diary/:id/addpost' 
                element={<AddDiary 
                    handleAddSubmit={handleAddSubmit}
                    postTitle={postTitle}
                    setPostTitle={setPostTitle}
                    postBody={postBody}
                    setPostBody={setPostBody}
                    image={image}
                    setImage={setImage} />} 
            />
            <Route path='/admin' element={<AdminPage />} /> 
            <Route path='/userpost/:id' element={<UserPosts />} />
            <Route path='/editdiary/:id' element={<EditDiary allDiaries={allDiaries} editTitle={editTitle} editBody={editBody} setEditTitle={setEditTitle} setEditBody={setEditBody} handleEditSubmit={handleEditSubmit}  />} />
        </Routes>
    </div>
  )
}

export default App