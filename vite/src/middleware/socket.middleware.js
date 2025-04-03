// import { createListenerMiddleware } from "@reduxjs/toolkit";
// import io from "socket.io-client";
// import {
//   connectSocket,
//   disconnectSocket,
//   receiveMessage,
//   joinRoom,
//   getRoomData,
//   leaveRoom,
//   setRoomData,
// } from "store/reducers/socketReducer";

// const listenerMiddleware = createListenerMiddleware();
// let socket;

// // Helper function to initialize listeners for the socket
// const initializeSocketListeners = (listenerApi) => {
//   if (!socket) return;

//   // Listen for 'message' events
//   socket.on("message", (message) => {
//     console.log("Message received from server:", message);
//     listenerApi.dispatch(receiveMessage(message));
//   });

//   // Handle socket disconnection
//   socket.on("disconnect", () => {
//     console.log("Socket disconnected");
//     listenerApi.dispatch(disconnectSocket());
//   });
// };

// // Start listening to the connectSocket action
// listenerMiddleware.startListening({
//   actionCreator: connectSocket,
//   effect: (action, listenerApi) => {
//     if (!socket) {
//       socket = io(import.meta.env.VITE_APP_SOCKET_URL);
//       console.log("Connecting to socket server...");

//       // Initialize listeners
//       initializeSocketListeners(listenerApi);
//       socket.on("userCount", (count) => {
//         console.log(count, "<========================== count agae");
//         listenerApi.dispatch(setRoomData(count));
//       });
//     }
//   },
// });

// // Handle sending random events
// // listenerMiddleware.startListening({
// //   actionCreator: sendRandomEvent,
// //   effect: (action) => {
// //     if (socket && socket.connected) {
// //       const randomData = action.payload;
// //       socket.emit("randomEvent", randomData);
// //       console.log("Sent random event with data:", randomData);
// //     }
// //   },
// // });

// // Handle joining a room
// listenerMiddleware.startListening({
//   actionCreator: joinRoom,
//   effect: (action) => {
//     if (socket && socket.connected) {
//       const roomData = action.payload;
//       socket.emit("joinRoom", roomData); // Corrected event name
//       console.log("Joining room with data:", roomData);
//     }
//   },
// });

// listenerMiddleware.startListening({
//   actionCreator: leaveRoom,
//   effect: (action) => {
//     if (socket && socket.connected) {
//       socket.emit("leaveRoom"); // Corrected event name
//     }
//   },
// });

// // Handle getting room data
// listenerMiddleware.startListening({
//   actionCreator: getRoomData,
//   effect: (action) => {
//     if (socket && socket.connected) {
//       // const roomData = action.payload;
//       console.log(action.payload, "<=== middleware");
//       socket.emit("getRoomData", action.payload.roomId); // Corrected event name
//       // console.log("Joining room with data:", roomData);
//     }
//   },
// });

// // Handle disconnection
// listenerMiddleware.startListening({
//   actionCreator: disconnectSocket,
//   effect: () => {
//     if (socket) {
//       socket.disconnect();
//       socket = null;
//       console.log("Socket connection closed");
//     }
//   },
// });

// export default listenerMiddleware;

import { createListenerMiddleware } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { updateCart } from "store/reducers/cartReducer";
import {
  connectSocket,
  disconnectSocket,
  receiveMessage,
  joinRoom,
  getRoomData,
  leaveRoom,
  setRoomData,
  addToCart, // Ensure this action is used for setting room data, including user count
} from "store/reducers/socketReducer";

const listenerMiddleware = createListenerMiddleware();
let socket;

// Helper function to initialize listeners for the socket
const initializeSocketListeners = (listenerApi) => {
  if (!socket) return;

  // Listen for 'message' events
  socket.on("message", (message) => {
    console.log("Message received from server:", message);
    listenerApi.dispatch(receiveMessage(message));
  });

  // Listen for 'userCount' event and update Redux store
  socket.on("userCount", (count) => {
    console.log("Received user count:", count);
    listenerApi.dispatch(setRoomData(count)); // Update Redux state with the count
  });

  // Listen for 'getRoomData' event and update Redux store
  socket.on("roomData", (roomData) => {
    console.log("Received room data:", roomData);
    listenerApi.dispatch(setRoomData(roomData)); // Update Redux state with the count
  });

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
    listenerApi.dispatch(disconnectSocket());
  });
};

// Start listening to the connectSocket action
listenerMiddleware.startListening({
  actionCreator: connectSocket,
  effect: (action, listenerApi) => {
    if (!socket) {
      socket = io(import.meta.env.VITE_APP_SOCKET_URL);
      console.log("Connecting to socket server...");

      // Initialize listeners
      initializeSocketListeners(listenerApi);
    }
  },
});

// Handle sending random events
// This is just an example, you can modify it as needed
// listenerMiddleware.startListening({
//   actionCreator: sendRandomEvent,
//   effect: (action) => {
//     if (socket && socket.connected) {
//       const randomData = action.payload;
//       socket.emit("randomEvent", randomData);
//       console.log("Sent random event with data:", randomData);
//     }
//   },
// });

// Handle joining a room
listenerMiddleware.startListening({
  actionCreator: joinRoom,
  effect: (action) => {
    if (socket && socket.connected) {
      const roomData = action.payload;
      socket.emit("joinRoom", roomData); // Ensure the event name is correct
      console.log("Joining room with data:", roomData);
    }
  },
});

// Handle leaving a room
listenerMiddleware.startListening({
  actionCreator: leaveRoom,
  effect: () => {
    if (socket && socket.connected) {
      socket.emit("leaveRoom"); // Ensure the event name is correct
    }
  },
});

// Handle getting room data
listenerMiddleware.startListening({
  actionCreator: getRoomData,
  effect: (action) => {
    if (socket && socket.connected) {
      const roomId = action.payload.roomId;
      console.log("Requesting room data for room:", roomId);
      socket.emit("getRoomData", roomId); // Ensure the event name is correct
    }
  },
});

// Handle disconnection
listenerMiddleware.startListening({
  actionCreator: disconnectSocket,
  effect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
      console.log("Socket connection closed");
    }
  },
});

// Handle getting room data
listenerMiddleware.startListening({
  actionCreator: updateCart,
  effect: (action, listenerApi) => {
    if (socket && socket.connected) {
      console.log(
        "we are going to add the upcoming cart data into the memory and then broadcast it to everyone on the room ,will also broadcast to people who wil join the room"
      );
      console.log(action.payload, "<==== middleware cart wow");
    }
  },
});

export default listenerMiddleware;
