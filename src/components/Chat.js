import React, { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from "../firebase-config.js";


import "../styles/Chat.css";

export const Chat = (props) => {
    const { room } = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages, (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });

            setMessages(messages);
        });

        return () => unsubscribe();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    };

    
    return (
        <div className="chat">
            <div className="chat-title">
                <h1>{room.toLowerCase()}</h1>
            </div>
            <div className="messages">
                {messages.map((message) => (
                    <div className="message" key={message.id}>
                        <div className="col">
                            <div className="row">
                                <span className="user"> <b>{message.user}</b></span>
                            </div>
                            <div className="row">
                                <span className="text">{message.text}</span>
                            </div>
                            {/*display the time */}
                            <div className="row">
                                <span className="timestamp">{new Date(message.createdAt?.toDate()).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="message-box">
                <form onSubmit={handleSubmit}>
                    <input
                        className="message-input"
                        placeholder="Type your message here ..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                    />
                    <button type="submit" className="message-submit">Send</button>
                </form>
            </div>
        </div>
        
    )
}