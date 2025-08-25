'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Backend port

export default function HomePage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('helloResponse', (data) => {
      setMessage(data);
    });

    return () => {
      socket.off('helloResponse');
    };
  }, []);

  const sendHello = () => {
    socket.emit('hello', 'Hello from Next.js!');
  };

  return (
    <div>
      <h1>Socket.IO Test</h1>
      <button className='bg-blue-600 p-3' onClick={sendHello}>Send Hello</button>
      <p>Response: {message}</p>
    </div>
  );
}
