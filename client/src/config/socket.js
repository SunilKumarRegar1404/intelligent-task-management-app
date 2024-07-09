// frontend/src/config/socket.js
import { io } from 'socket.io-client';
console.log("Socket loaded!");


const socket = io(import.meta.env.VITE_SERVER_BASE_PATH_LOCAL,{
    withCredentials:true
});

export default {socket};
