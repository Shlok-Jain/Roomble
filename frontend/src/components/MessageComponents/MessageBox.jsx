import React, { useState, useContext, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MessageCard from './MessageCard.jsx';
import '../../css/MessageBoxStyle/MessageBox.css';
import { Basecontext } from '../../context/base/Basecontext';
import { socket } from '../../socket.js';
import config from "../../config.json";
import {toast} from 'react-toastify';

function MessageBox() {

    const state = useContext(Basecontext);
    const { user, setUser, fetuser } = state;
    const [currentMessages, setCurrentMessages] = useState([]);
    const [currentUserId, setCurrentUserId] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [somethingwentwrong, setSomethingwentwrong] = useState(false);


    useEffect(() => {
        setCurrentUserId(user._id);
        const fetchConversations = async () => {
            try {
                const res = await fetch(`${config.backend}/messages/getConversations`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authtoken": localStorage.getItem("authtoken")
                    }
                })
                const data = await res.json();
                if (data.success) {
                    setCurrentMessages(data.conversations);
                }else{
                    setSomethingwentwrong(true);
                }

            } catch (error) {
                setSomethingwentwrong(true);
            }
        };

        fetchConversations();
    }, [user]);
      useEffect(()=>{
        if(somethingwentwrong){
          toast.error('Something went wrong. Please try again later.');
          navigate(-1)
        }
      }, [somethingwentwrong]);

    useEffect(()=>{
        socket.on("message", (data) => {
            const fetchConversations = async () => {
                try {
    
                    const res = await fetch(`${config.backend}/messages/getConversations`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authtoken": localStorage.getItem("authtoken")
                        }
                    })
                    const data = await res.json();
                    if (data.success) {
                        setCurrentMessages(data.conversations);
                    }
    
                } catch (error) {
                    setSomethingwentwrong(true);
                }
            };
    
            fetchConversations();
        })
    })
// filetr according to time and search
    const filteredMessages = currentMessages
        .filter(conversation =>
            conversation.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (<div className="message-cards">
        {/*Top contains the heading and search bar*/}
        <div className="top">
            <h2 className="people-text">People</h2>
            <div className='search-bar'>
                <SearchIcon style={{ fontSize: 30 }} />
                <input type="text" placeholder="Search" className="chat-search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
        </div>
        {/*Bottom contains the list of all the users*/}
        {/*All message are temporary now. Map function will be used afterwards*/}
        <div className="bottom">
            {filteredMessages.map((conversation, index) => {
                return <MessageCard key={index} conversation={conversation} />
            })}

        </div>
    </div>);
}
export default MessageBox;