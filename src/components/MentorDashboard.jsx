import { AppBar, Box, Button, Card, CardActions, CardContent, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios"


const MentorDashboard = () => {
  const [title,setTitle]=useState("");
  const[file,setFile]=useState("");
  const[allImage,setAllImage]=useState(null);

  const[projects,setProjects]=useState([]);
  useEffect(()=>{
    const fetchProjects=async()=>{
      const mentorId=sessionStorage.getItem("mentorId");
      console.log("mentorId",mentorId);
      if(!mentorId){
        console.log("Mentor Id not found");
      
      return;
    }
    try {
      const res=await axios.get(`https://ictak-internship-w182.onrender.com/mentor/projects/${mentorId}`);
      console.log("projects response:",res.data);
      setProjects(res.data);
    } catch (error) {
      console.log("Error Fetching",error);
    }
  
  }
  fetchProjects()},[]);

  useEffect(()=>{
  getPdf();
  },[]);
const getPdf=async()=>{
  const result=await axios.get("https://ictak-internship-w182.onrender.com/mentor/get-files");
  console.log(result.data.data);
  setAllImage(result.data.data);
};
const submitImage = async(e) => {
  e.preventDefault();
const formData=new FormData();
formData.append("title",title);
formData.append("file",file);
console.log(title,file);
const result =await axios.post("https://ictak-internship-w182.onrender.com/mentor/upload-files",formData,{
headers:{"content-type":"multipart/form-data"},

  });
  console.log(result);
if(result.data.status=="ok"){
  getPdf();
}
}
const showPdf=(pdf)=>{
  window.open(`https://ictak-internship-w182.onrender.com/mentor/get-files`);
}
const styles = {
  container: {
    backgroundImage: "url('/images/mentordash.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', 
    padding: '20px',
    textAlign: 'center'
  },
};
  return (
   
    <div style={styles.container}>
      <Box sx={{backgroundColor: 'transparent',
            boxShadow: 'none', }} >
      <AppBar position="fixed" >
        <Toolbar >
        <img src="images/logo.png"
        alt="Logo"
        style={{ height: '100px', marginRight: '90px' }} 
      />
       <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,textAlign:'left'}}>
            Mentor Dashboard
          </Typography>
          <Button color="inherit" sx={{fontSize:'15px'}}  href='/'><h3>Logout</h3></Button>
        </Toolbar>
      </AppBar>
    </Box>
    
    <Card sx={{ width: 300, marginTop: '14%', padding: 2, alignItems:'center'  }}>
          <CardContent>
      <Typography gutterBottom sx={{ color: 'black', fontSize: 25}}>
        Projects
      </Typography>
      {
        projects.map(project => project)
      }
    </CardContent>
    <CardActions>
      <Button size="small" href='/sub'>View Submissions</Button>
    </CardActions>
  </Card><br/><br/>
   <Typography gutterBottom sx={{ color: 'black', fontSize: 25,marginTop:'12%'}}>
      Reference Material
      </Typography>
      <form onSubmit={submitImage}>
        <input type='text' placeholder='Title' required 
        onChange={(e)=>setTitle(e.target.value)}/>
        <input variant='outlined' type='file' accept='application/pdf' required 
        onChange={(e)=>setFile(e.target.files[0])}/>
<br/><br/>
   
        {/* <TextField type='text' label='Reference Material' sx={{width:500}} /><br/><br/> */}
  <Button variant='outlined' color='black' type='submit'><b>Submit</b></Button>
  <div className='uploaded'>
    <h4>Uploaded PDF:</h4>
    <div className='output-div'>
      {allImage==null?"":allImage.map((data,index)=>{
        return(<div className='inner-div' key={index}>
          <h6>Title:{data.title}</h6>
          <button className='btn btn-primary' onClick={()=>showPdf(data.pdf)}>Show Pdf</button>
        </div>)
      })}
      
    </div>
  </div>
  <Button variant='outlined'>Delete</Button>
  </form>
  </div>
  
  )
}

export default MentorDashboard




