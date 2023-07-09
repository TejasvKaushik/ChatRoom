import React, { useState, useRef } from 'react';
import './App.css';
import { Auth } from "./components/Auth.js";
import { Chat } from "./components/Chat.js";
import Cookies from "universal-cookie";
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config.js';
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if(!isAuth){
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
    }
  return (
    <>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className="room">
          <label>Select a room: </label>
          <div >
          <select ref={roomRef} className='select bottom'>
            <option value="General">General</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="News">News</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          </div>
          <button onClick={() => setRoom(roomRef.current.value)}>Enter Room</button>
        </div>
      )}

        <button className="sign-out" onClick={signUserOut}>Sign Out</button>
    </>
  );
}

export default App;
