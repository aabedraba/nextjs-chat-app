import { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";


function Messages(props) {
    const [messageList, setMessageList] = useState(props.messageList)

    useEffect(() => {
        const socket = socketIOClient('http://localhost:3001');
        socket.on("message", data => {
            const newMessage = {
                id: data.id,
                message: data.message,
                userName: props.userName
            }
            setMessageList(() => [...messageList, newMessage]);
        });
    }, []);

    return (
        <div>
            {messageList.map(
                message =>
                    <p key={message.id}>{message.userName}: {message.message}</p>
            )}
            <style jsx>{`
                p {
                    text-align: center
                }
            `}</style>
        </div>
    );
}

export default Messages;