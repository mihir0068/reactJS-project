import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    likedUsers: [],
    comment: [],
  },
  reducers: {
    setUsers(state, action) {
      state.userData = action.payload;
    },
    toggleLike(state, action) {
      const userId = action.payload;
      state.likedUsers[userId] = !state.likedUsers[userId];
    
    },
    addCommnet(state, action) {
      const user = action.payload;
      state.comment.push({
        userId:user.userId,
        comments:user.comment,
        id: new Date().toISOString() 
      })
    },
    deleteComment(state,action){
      const commentId = action.payload;
      state.comment = state.comment.filter(comment => comment.id !== commentId);
    }
  },
});

export const userAction = userSlice.actions;
export default userSlice;
