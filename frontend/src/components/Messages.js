import { useEffect, useState, useRef } from 'react'
import { socketIO } from '../lib/socket'

function Messages(props) {
    const [messageList, setMessageList] = useState()
    const [userName, setUserName] = useState('')
    const prevRef = useRef();

    useEffect(() => {
        setMessageList(props.messageList)
        setUserName(props.userName)
        prevRef.current = userName
     }, [props.messageList, props.userName])

    useEffect(() => {
        const socket = socketIO()
        socket.on("message", data => {
            const newMessage = {
                id: data.id,
                message: data.message,
                userName: prevRef.current
            }
            setMessageList((prevState) => {
                return [...prevState, newMessage]
            });
        });
    }, []);

    return (
        <div>
            {messageList?.map(
                message => {
                    return (
                        <p key={message.id}>{message.userName}: {message.message}</p>
                    )
                }
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