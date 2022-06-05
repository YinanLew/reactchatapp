import React, {useEffect, useState} from 'react';
import db from "../../firebase";

import './style.css';
import {Avatar} from "@mui/material";
import {NavLink} from "react-router-dom";

function SidebarChat({addNewChat, id, name}) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        const randomAvatar = Math.ceil(Math.random() * 500);
        setSeed(randomAvatar);
    }, []);

    const createNewChat = () => {
        const roomName = prompt("Please enter name for chat")

        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            })
        }
    }

    useEffect(() => {
        if (id) {
            db.collection("rooms")
                .doc(id).collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data())));
        }
    }, []);

    // console.log(id);

    return !addNewChat ? (
        <NavLink style={{ textDecoration: 'none', color: 'black'}} to={`/rooms/${id}`}>
            <div className={"sidebarChat"}>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </NavLink>
    ):(
        <div onClick={createNewChat} className={"sidebarChat"}>
            <h2 className={"addNew"}>add new chat</h2>
        </div>
    );
}

export default SidebarChat;