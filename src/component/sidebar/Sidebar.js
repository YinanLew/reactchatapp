import React, {useEffect, useState} from 'react';

import "./style.css";
import {Avatar} from "@material-ui/core";
import {DonutLarge, MoreVert, SearchOutlined} from "@material-ui/icons";
import ChatIcon from '@mui/icons-material/Chat';
import {Button, IconButton} from "@mui/material";
import SidebarChat from "../sidebarChat/SidebarChat";
import db from "../../firebase";
import {useStateValue} from "../../StateProvider";



function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const [search, setSearch] = useState('');
    const [newRooms, setNewRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot(snapshot =>
        setRooms(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        })))
        );
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (search === ''){
            setNewRooms(rooms);
        }
    })


    const searchChatRoom = (e) => {
        e.preventDefault();

        return setNewRooms(rooms.filter(room => room.data.name.toLowerCase().includes(search.toLowerCase())))
    }

    return (
        <div className={"sidebar"}>
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__header-btns">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <form action="">
                <div className="sidebar__search-container">
                    <SearchOutlined color={"primary"} />
                    <input type="text" placeholder={"Search Chat"} onChange={e => {setSearch(e.target.value)}}/>
                    <Button className={"searchBtn"} type={"submit"} onClick={e => searchChatRoom(e)}/>
                </div>
                </form>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {
                    newRooms === []?
                        rooms.map((room) => (
                            <SidebarChat key={room.id} id={room.id} name={room.data.name} />))
                    :
                        newRooms.map((room) => (
                            <SidebarChat key={room.id} id={room.id} name={room.data.name} />))
                }
            </div>
        </div>
    );
}

export default Sidebar;