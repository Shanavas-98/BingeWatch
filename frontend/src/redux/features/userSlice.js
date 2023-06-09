import { createSlice } from "@reduxjs/toolkit"

const initialState={
    id:"",
    fullName:"",
    email:"",
    image:"",
    token:""
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.id=action.payload.id;
            state.fullName=action.payload.name;
            state.email=action.payload.email;
            state.image = action.payload.image;
            state.token=action.payload.token;
        },
        setSignoutState:(state,action)=>{
            state.id=null;
            state.fullName=null;
            state.email=null;
            state.image =null;
            state.token=null;
        }
    }
})

export const {setSignoutState, setUserDetails}=userSlice.actions;

export default userSlice.reducer;