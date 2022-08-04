const initialState={
   modified : ""
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "MODIFY":return{
            ...state,
            modified:action.value
        }
        default:return state;
    }
}

export default reducer;