import React from 'react'
import {

    updateDescriptionTask,
    getTask

  } from "../../Webservices/endpoints";
  import  { useState, useEffect } from 'react';
  import TextField from '@mui/material/TextField';
  import Button from '@mui/material/Button';

  import { useForm } from "../../util/hooks";
  import { useHistory } from "react-router-dom";
  import { useSelector } from "react-redux";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import image from "../../images/list.png"
function Task(props) {
    let history = useHistory();
    const token = localStorage.getItem('jwtToken');

    if (!token) {

        history.push("/login");
    
      }

    const [items, setItem] = useState();

    const [miseajour , setmiseajour] = useState(1);

    //send a request to receive task 
    useEffect(() => {
        getTask(props.match.params.id).then((response) => setItem(response.data));
      
    }, [miseajour])
    const { onChange, onSubmit, values } = useForm(taskadded, {
        description: "",
      });
      async function taskadded() {
        updateDescriptionTask(props.match.params.id,values.description)
        await setmiseajour(miseajour+1)
      }
    
    return (
      items ?
        <div>
            <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item  pt={3}>
  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {items.task}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {items.description != null? items.description : "No description (add a new description)"}
        </Typography>
        <Typography  mb={3} variant="body2"  color="primary">
        {items.completed ? "completed" : "not completed"}
        </Typography>
      </CardContent>
      <CardActions>
      <form
          onSubmit={onSubmit}
          className="flex"
          style={{ margin: "25px 0" }}
        >
          <TextField
            variant="outlined"
            size="small"
            style={{ width: "80%" }}
            onChange={onChange}
            value={values.description}
            name="description"
            placeholder="Add New TO-DO"
          />
        
          <Button
            style={{ height: "40px" }}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Add a description
          </Button>
        </form>
      </CardActions>
    </Card>
  </Grid>   

</Grid> 
            
        
        </div>
   :"" )
}

export default Task;
