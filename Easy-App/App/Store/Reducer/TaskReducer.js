import {ADD_TASK} from "../Actions/TaskAction"
 
const initialState = {}

const TaskReducer = (state = initialState,action) => {
    switch(action.type){

        case ADD_TASK:
            return [...state,action.payload]

        default:
            return state
        
    }


}

export default TaskReducer