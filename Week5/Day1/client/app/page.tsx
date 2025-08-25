'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const socket = io('http://localhost:3001');

export default function CommentSection() {
  const [comments, setComments] = useState<{ text: string; user: string }[]>([]);
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.on('commentAdded', (comment) => {
      setComments((prev) => [...prev, comment]);

      // Show toast only for other users
      if (comment.user !== (username.trim() || 'Anonymous')) {
        toast.success(`${comment.user} commented: ${comment.text}`);
      }
    });

    return () => {
      socket.off('commentAdded');
    };
  }, [username]);

  const sendComment = () => {
    if (text.trim() === '') return; // validation: don't send empty message

    const finalUser = username.trim() === '' ? 'Anonymous' : username.trim();

    socket.emit('newComment', { text, user: finalUser });
    setText('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-Time Comments</h1>

      <div style={{ marginBottom: 10 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username (optional)"
          style={{ marginRight: 10 }}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          style={{ marginRight: 10 }}
        />
        <button onClick={sendComment}>Send</button>
      </div>

      <ul>
        {comments.map((c, i) => (
          <li key={i}>
            <b>{c.user}:</b> {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
