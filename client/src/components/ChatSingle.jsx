import React from 'react'
import { userState } from '../context/UserContext'

const ChatSingle = ({msg}) => {
    const {user} =  userState();
    console.log(user);
  return (
    <div className="flex gap-2 mb-2 bg-slate-50 p-1">
          <span>
            <img
              className="h-6 w-6 rounded-full"
              src={msg?.dp}
              alt=""
              srcset=""
            />
          </span>
          <span className="text-sm">
            <h6 className="font-semibold">{user._id == msg.userId ? "You":msg.userName}</h6>
            <p>{msg.msg}</p>
          </span>
        </div>
  )
}

export default ChatSingle