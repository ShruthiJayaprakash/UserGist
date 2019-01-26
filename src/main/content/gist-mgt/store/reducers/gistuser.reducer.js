import * as Actions from '../actions';

const initialState = {
    data      : [],
    forkdata :[],
    user:''
};

const gistuserReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_GISTUSERDETAILS:
        {
            return {
                ...state,
                data: action.payload,
                user:action.user
            };
        }
        case Actions.GET_GISTUSERFORKDETAILS:
        {
            return {
                ...state,
                data:state.data,
                user:state.user,
                forkdata: action.payload
            };
        } 
        default:
        {
            return state;
        }
    }
};

export default gistuserReducer;
