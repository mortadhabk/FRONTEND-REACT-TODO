import {
  ADDTASK,
} from "./type";
const initialState = {
  tasks: { }

}

const TasksReducer  = (state = initialState, action) => {
  switch (action.type) {
    case ADDTASK:
      return {
        ...state,
        tasks : action.payload
       
      };

   
    default:
      return state;
  }
};
export default TasksReducer ;
