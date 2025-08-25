'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Backend Port

export default function CommentSection() {
  const [comments, setComments] = useState<{ text: string }[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // Listen for broadcasted comments
    socket.on('commentAdded', (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    return () => {
      socket.off('commentAdded');
    };
  }, []);

  const sendComment = () => {
    if (text.trim() === '') return;

    socket.emit('newComment', { text });
    setText('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-Time Comments</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />

      <button onClick={sendComment}>Send</button>

      <ul>
        {comments.map((c, i) => (
          <li key={i}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
}
