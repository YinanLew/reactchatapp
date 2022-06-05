import React, {useEffect, useState} from 'react';
import "./style.css";
import {Avatar, Button, IconButton} from "@mui/material";
import {AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined} from "@material-ui/icons";
import {useParams} from "react-router-dom";
import db from "../../firebase";
import {useStateValue} from "../../StateProvider";
import firebase from 'firebase/compat/app';
import SidebarChat from "../sidebarChat/SidebarChat";


function Chat() {

    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [{user}, dispatch] = useStateValue();
    const [search, setSearch] = useState('');
    const [newMessages, setNewMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)))
        }
        if (roomId) {
            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
        }
    },[roomId]);


    useEffect(() => {
        const randomAvatar = Math.ceil(Math.random() * 500);
        setSeed(randomAvatar);
    }, []);

    const send = (e) => {
        e.preventDefault();

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('');
    }


    const searchBar = () => {
        
    }

    const searchChat = (e) => {
        e.preventDefault();

        return setNewMessages(messages.filter(message => message.message.toLowerCase().includes(search.toLowerCase())))
    }

    useEffect(() => {
        if (search === ''){
            setNewMessages(messages);
        }
    })

    console.log(newMessages)
    return (
        <div className={"chat"}>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__header-Info">
                    <h3>{roomName}</h3>
                    <p>
                        {
                            new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString() === 'Invalid Date'?
                                'No Message' : new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>

                <form action="">
                    <div className="chat__header-btns">

                            <Button style={{width: '0px', height: '0px' }} type={"submit"} onClick={e => searchChat(e)}/>
                                <input className={"chat__header-input"} type="text" onChange={e => {setSearch(e.target.value)}} />

                        <IconButton onClick={searchBar}>
                            <SearchOutlined color={"primary"}/>
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </div>
                </form>
            </div>

            <div className="chat__body">
                {
                    newMessages === []?
                        messages.map((message, index) => (
                            <div key={index}>
                                <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                            <span className={"chat__name"}>
                                {message.name}
                            </span>
                                    {message.message}
                                    <span className={"chat__timestamp"}>
                                {
                                    new Date(message.timestamp?.toDate()).toUTCString()
                                }
                            </span>
                                </p>
                            </div>
                        ))
                        :
                        newMessages.map((message, index) => (
                            <div key={index}>
                                <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                            <span className={"chat__name"}>
                                {message.name}
                            </span>
                                    {message.message}
                                    <span className={"chat__timestamp"}>
                                {
                                    new Date(message.timestamp?.toDate()).toUTCString()
                                }
                            </span>
                                </p>
                            </div>
                        ))
                }
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form action="">
                    <input placeholder={"Type"} type="text" value={input}
                           onChange={event => setInput(event.target.value)} />
                    <button type={"submit"} onClick={send}>Send</button>
                </form>
                <Mic />
            </div>

        </div>
    );
}

export default Chat;