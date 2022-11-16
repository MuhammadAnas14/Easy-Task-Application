import {combineReducers} from 'redux'
import TaskReducer from './TaskReducer'


const reducer = combineReducers ({

    task : TaskReducer
})


export default reducer