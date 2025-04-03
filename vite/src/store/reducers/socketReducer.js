import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  roomUsers: 0,
  count: 0,
  messages: [], // Store messages received from the server
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    // Action to connect the socket
    connectSocket: (state) => {
      state.connected = true;
    },
    // Action to disconnect the socket
    disconnectSocket: (state) => {
      state.connected = false;
    },
    // Action to handle receiving messages from the socket
    receiveMessage: (state, action) => {
      state.messages.push(action.payload); // Add new message to the state
    },
    sendMessage: () => {
      console.log("send");
    },
    getRoomData: (state, action) => {
      state.roomData = action.payload.roomData;
    },
    setRoomData: (state, action) => {
      console.log("count getting changed", action.payload);
      state.roomUsers = action.payload.count;
    },
    joinRoom: (state, action) => {
      state.roomID = action.payload.roomID;
      state.userID = action.payload.userID;
    },
    leaveRoom: (state, action) => {
      state.roomID = null;
    },
    addToCart: (state, action) => {
      state.booked = action.payload;
    },
  },
});

export const {
  connectSocket,
  disconnectSocket,
  receiveMessage,
  sendMessage,
  joinRoom,
  getRoomData,
  leaveRoom,
  setRoomData,
  addToCart,
} = socketSlice.actions;
export default socketSlice.reducer;
