// import { setSocket, setConnected, resetSocket } from '../reducers/socketReducer';
// import { io } from 'socket.io-client';


// export const initializeSocket = () => (dispatch, getState) => {
//     const { socket } = getState().socket;

//     if (!socket) {
//         const newSocket = io('http://localhost:5000', { transports: ['websocket'] });

//         newSocket.on('connect', () => {
//             dispatch(setConnected(true));
//             console.log('Connected to socket server');
//         });

//         newSocket.on('disconnect', () => {
//             dispatch(setConnected(false));
//             console.log('Disconnected from socket server');
//         });

//         // You can add more event listeners here
//         // Example: listening to a custom event
//         newSocket.on('someEvent', (data) => {
//             console.log('Received data:', data);
//             // Handle the received data
//         });

//         // Dispatch the socket instance to the Redux store
//         dispatch(setSocket(newSocket));
//     }
// };


// export const disconnectSocket = () => (dispatch, getState) => {
//     const { socket } = getState().socket;
//     if (socket) {
//         socket.disconnect();
//         dispatch(resetSocket());
//         console.log('Socket disconnected and reset');
//     }
// };