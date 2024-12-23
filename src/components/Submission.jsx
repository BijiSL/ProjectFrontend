import { AppBar, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import axiosInstance from './axiosinterceptors';

const Submission = () => {
  const [submissions,setSubmissions]=useState([]);
  const [newSubmission,setNewSubmission]=useState({
    student:"",
    status:"None",
    marks:0,
    comments:"",
  });
   const [projects, setProjects] = useState([]);

  // Fetch submissions
  useEffect(()=>{
    axios.get("http://localhost:4000/mentor/submission/get").then((res)=>{
      setSubmissions(res.data);
    });
      },[]);

  // Add new submission
  const handleAdd = () => {
    axios.post("http://localhost:4000/mentor/submission/add", newSubmission)
    .then((res) => {
      setSubmissions([...submissions, res.data]);
      setNewSubmission({ student:"",status: "None", marks: 0, comments: "" });
      console.log(res.data);
    });
  };

  const fetchproject=()=>{
    axiosInstance.get('http://localhost:4000/admin/project/get',projects)
    .then((res)=>{
    console.log(res.data)
    setProjects(res.data);
    })
    .catch((err)=>{
      console.error('Error fetching projects:', err);
    });
    };
  // Update submission
  const handleSave = (id, updatedData) => {
    axios.put(`http://localhost:4000/mentor/submission/update/${id}`,updatedData)
    .then((res)=>{
    setSubmissions(res.data)
   }) .catch((err) => {
         console.error('Error fetching mentors:', err);
       });
   };
   useEffect(()=>{
   fetchproject();},[]);
// Delete
const handleDelete=(id)=>{
axios.delete(`http://localhost:4000/mentor/submission/delete/${id}`)
.then(()=>{
  setSubmissions(submissions.filter((item)=>item._id!==id))
})
}
const handleView=(id)=>{
  axios.delete(`http://localhost:4000/mentor/submission/projects/${id}`)
  .then(()=>{
    setSubmissions(submissions.filter((item)=>item._id!==id))
  })
  }
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundImage: "url('images/sub.avif')", 
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white", 
    header: {
      textAlign: "center",
      marginBottom: "20px",
      color: "white", 
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "50%",
      maxWidth: "400px",
      margin: "0 auto",
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
      padding: "15px",
      borderRadius: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      margin: "20px 0",
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly transparent table background
    },
    th: {
      backgroundColor: "#333",
      color: "white",
      padding: "10px",
      textAlign: "left",
      border: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      border: "1px solid #ddd",
      textAlign: "left",
      color: "black",
    },
    actions: {
      display: "flex",
      gap: "5px",
    },
    button: {
      padding: "5px 10px",
      border: "none",
      cursor: "pointer",
    },
    addButton: {
      backgroundColor: "#4caf50",
      color: "white",
    },
    deleteButton: {
      backgroundColor: "#f44336",
      color: "white",
    },
    updateButton: {
      backgroundColor: "#2196f3",
      color: "white",
    },
    
header:{
  textAlign:"center"
    },
  }
  
}
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
        </Box><br/><br/><br/><br/><br/><br/><br/><br/>
 <center> <h1 style={styles.header}>Submissions</h1></center>
     
      <center><div>
      <center>  <h3>Add Submission</h3></center>
        <input type="text" placeholder="Student" value={newSubmission.student}
          onChange={(e) => setNewSubmission({ ...newSubmission, student: e.target.value })}
        />
        <select
          value={newSubmission.status}
          onChange={(e) => setNewSubmission({ ...newSubmission, status: e.target.value })}
        >
          <option value="None">None</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
        </select>
        <input
          type="number"
          placeholder="Marks"
          value={newSubmission.marks}
          onChange={(e) => setNewSubmission({ ...newSubmission, marks: e.target.value })}
        />
        <input
          type="text"
          placeholder="Comments"
          value={newSubmission.comments}
          onChange={(e) => setNewSubmission({ ...newSubmission, comments: e.target.value })}
        /><br/><br/>
        <Button color="secondary" variant='contained' onClick={handleAdd}>Add Student</Button>
      </div></center><br/><br/>

<center>
      {/* Submissions Table */}
      <table border="1">
        <thead>
          <tr>
          <th>Student</th>
            <th>Status</th>
            <th>Marks</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((item) => (
            <tr key={item._id}>
              <td>
            <input type='text' value={item.student} onChange={(e) =>{
                    handleSave(item._id, { ...item, student: e.target.value })
             } }/>
                
                </td>
              <td>
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleSave(item._id, { ...item, status: e.target.value })
                  }
                >
                  <option value="None">None</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={item.marks}
                  onChange={(e) =>
                    handleSave(item._id, { ...item, marks: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.comments}
                  onChange={(e) =>
                    handleSave(item._id, { ...item, comments: e.target.value })
                  }
                />
              </td>
              <td>
              <Button
    onClick={() =>
      handleSave(item._id, {
        student: item.student,
        status: item.status,
        marks: item.marks,
        comments: item.comments,
      })
    }
 variant='contained' color='secondary' >Update</Button>
                <Button variant='contained'color="secondary" onClick={() => handleView(item._id)} href='/mentor'>view</Button>
                <Button variant='contained'color="secondary" onClick={() => handleDelete(item._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></center><br/><br/>
    <center>  <Button color='secondary' variant='contained' href='/mentor'>Back</Button></center>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
  );
};

export default Submission












