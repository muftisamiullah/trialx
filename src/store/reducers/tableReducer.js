import * as actionTypes from '../actions/actionTypes.js';

const initalState={
    table:null,
}

const tableReducer = ( state = initalState, action) => {
    switch ( action.type ) {
        case actionTypes.GET_TABLE_DATA: 
            return { ...state, table: action.value };
        default: return state;
    }
}

export default tableReducer