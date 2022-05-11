import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import "./Home.css"


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Addtask } from "../../store/Tasks/actions";
import {
  getTasks,
  addTask,
  updateTask, deleteTask
} from "../../Webservices/endpoints";
import { useDispatch } from "react-redux";
import { useForm } from "../../util/hooks";
import { filledInputClasses } from '@mui/material';

function Home() {
  const dispatch = useDispatch();
  let history = useHistory();
  const userid = useSelector((state) => state.Auth.user);
  const [miseajour, setmiseajour] = useState(1);

  // using form hook to get task input
  const { onChange, onSubmit, values } = useForm(taskadded, {
    task: "",
  });

  //  get tasks from REDUX STORE
  const tasks = useSelector((state) => state.Tasks.tasks);

  //  we can't navigate to the home component without the authentification 
  const token = useSelector((state) => state.Auth.user.token);
  if (!token) {
    history.push("/login");
  }

  // get all tasks and update everytime depends on the attribut mise a jour
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getTasks();
      dispatch(Addtask(response.data));
    }
    fetchMyAPI()
  }, [miseajour])


  // create add request 
  async function taskadded() {
    addTask(values.task)
    await setmiseajour(miseajour + 1)
  }


  // create update request 
  async function handleUpdate(id, completed) {
    updateTask(id, completed);
    await setmiseajour(miseajour + 1)
  }

  // create delete request 
  async function deleteitem(id) {
    deleteTask(id);
    await setmiseajour(miseajour + 1)
  }

  // sort tasks list with the created at and depends to the action completed too
  const sortedList = Object.values(tasks).sort((a, b) => (a.created_at < b.created_at) ? 1 : -1)
  const sorted2 = sortedList.sort((a, b) => Number(a.completed) - Number(b.completed))
  return (
    <div className="App flex">
      <Paper elevation={3} className="container">
        <div className="heading">TO-DO</div>
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
            value={values.task}
            name="task"
            placeholder="Add New TO-DO"
          />
          <Button
            style={{ height: "40px" }}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Add task
          </Button>
        </form>


        {

          sorted2.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <Paper className="flex task_container">
                <ListItem
                  key={value._id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">

                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} dense>
                    <ListItemIcon>
                      <Checkbox
                        checked={value.completed}
                        onClick={() => handleUpdate(value._id, !value.completed)}
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText className={
                      value.completed
                        ? "task line_through"
                        : "task"
                    } id={labelId} onClick={() => history.push(`/${value._id}`)} primary={value.task} />
                    <Button
                      style={{ height: "40px" }}
                      variant="contained"
                      color="error"
                      onClick={() => deleteitem(value._id)}
                    >
                      Delete
                    </Button>
                  </ListItemButton>
                </ListItem>
              </Paper>);
          })}

      </Paper>
    </div>

  );
}

export default withRouter(Home);
