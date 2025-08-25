'use client';
import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';

interface Comment {
  text: string;
  user: string;
  timestamp?: string;
}

interface ValidationErrors {
  username?: string;
  comment?: string;
}

function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const socketRef = useRef<Socket | null>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Constants for validation
  const MAX_USERNAME_LENGTH = 30;
  const MAX_COMMENT_LENGTH = 500;
  const MIN_COMMENT_LENGTH = 1;

  // Get server URL from environment variables
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SERVER_URL, {
      timeout: 5000,
      retries: 3,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      setIsConnected(true);
      toast.success('Connected to chat!');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      toast.error('Disconnected from chat');
    });

    socket.on('connect_error', (error) => {
      setIsConnected(false);
      toast.error('Failed to connect to chat server');
      console.error('Connection error:', error);
    });

    socket.on('error', (error: { message: string }) => {
      toast.error(error.message || 'An error occurred');
      setIsLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []); // Remove username dependency

  // Separate useEffect for handling comment events
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleCommentAdded = (comment: Comment) => {
      setComments((prev) => [...prev, comment]);

      // Show toast only for other users
      const currentUser = username.trim() || 'Anonymous';
      if (comment.user !== currentUser) {
        toast.success(`${comment.user} commented`);
      }
    };

    socket.on('commentAdded', handleCommentAdded);

    return () => {
      socket.off('commentAdded', handleCommentAdded);
    };
  }, [username]); // This useEffect can depend on username for the toast logic

  useEffect(() => {
    // Auto-scroll to bottom when new comments are added
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validate username
    if (username.length > MAX_USERNAME_LENGTH) {
      newErrors.username = `Username must be ${MAX_USERNAME_LENGTH} characters or less`;
    }

    // Validate comment
    const trimmedText = text.trim();
    if (trimmedText.length < MIN_COMMENT_LENGTH) {
      newErrors.comment = 'Comment cannot be empty';
    } else if (trimmedText.length > MAX_COMMENT_LENGTH) {
      newErrors.comment = `Comment must be ${MAX_COMMENT_LENGTH} characters or less`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendComment = async () => {
    if (!validateInputs()) return;
    if (!isConnected) {
      toast.error('Not connected to server');
      return;
    }

    setIsLoading(true);
    const trimmedText = text.trim();
    const finalUser = username.trim() || 'Anonymous';

    try {
      socketRef.current?.emit('newComment', { 
        text: trimmedText, 
        user: finalUser,
        timestamp: new Date().toISOString()
      });
      setText('');
      setErrors({});
    } catch (error) {
      toast.error('Failed to send comment');
      console.error('Send comment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendComment();
    }
  };

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Real-Time Comments
          </h1>
          <p className="text-gray-600">
            Join the conversation and share your thoughts!
          </p>
          
          {/* Connection Status */}
          <div className="mt-4 flex items-center justify-center">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              isConnected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="space-y-4">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username (optional)
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username..."
                maxLength={MAX_USERNAME_LENGTH}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {username.length}/{MAX_USERNAME_LENGTH} characters
              </p>
            </div>

            {/* Comment Input */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Your Comment
              </label>
              <textarea
                id="comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write your comment here... (Press Enter to send)"
                maxLength={MAX_COMMENT_LENGTH}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                  errors.comment ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.comment && (
                <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
              )}
              <div className="mt-1 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  {text.length}/{MAX_COMMENT_LENGTH} characters
                </p>
                <p className="text-xs text-gray-400">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={sendComment}
              disabled={isLoading || !isConnected}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                isLoading || !isConnected
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                'Send Comment'
              )}
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Comments ({comments.length})
            </h2>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {comments.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-lg">No comments yet</p>
                <p className="text-sm">Be the first to start the conversation!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {comment.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {comment.user}
                          </h3>
                          {comment.timestamp && (
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(comment.timestamp)}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed break-words">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={commentsEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ErrorBoundary>
      <CommentSection />
    </ErrorBoundary>
  );
}
