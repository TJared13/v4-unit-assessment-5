const initialState = {
    username: null,
    profilePicture: null
}

const UPDATE_USER = 'UPDATE_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
};

export function logout(){
    return {
        type: LOG_OUT_USER,
    }
}



export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload
            }
            
        case LOG_OUT_USER:
            return {
                state,
            }

        default: return state;
    }
};