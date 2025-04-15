import { useState, useEffect, useRef } from 'react';
import '../styles/retro.css';
import { useLanguage } from '../context/LanguageContext';
import ConfirmationModal from '../components/ConfirmationModal';
import AvatarModal from '../components/AvatarModal';

const ChatPage = () => {
  const { t, language, changeLanguage } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username] = useState(localStorage.getItem('username') || 'Sr. :)');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || ':)');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [usersOnline, setUsersOnline] = useState(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const originalSize = useRef({
    width: '800px',   
    height: '600px'
  });

  const avatars = [
    ':)', ':(', ':D', ':v', 'uwu', ':c', '>:c', '^_^', 'o_o', '-_-',
    'xD', ':P', '>:)', 'T_T', ';)', ':3', '>w<', ':O', ':|', '._.', 
    '¬_¬', '¯\\_(ツ)_/¯', '・_・','ʕ•ᴥ•ʔ',  '(¬‿¬)' , '(°ロ°)☝', 'ಠ_ಠ',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'windows95';
    document.body.setAttribute('data-theme', savedTheme);
    
    if (chatRef.current) {
      chatRef.current.style.width = originalSize.current.width;
      chatRef.current.style.height = originalSize.current.height;
      chatRef.current.style.position = 'relative';
      chatRef.current.style.margin = '0';
    }

    const interval = setInterval(() => {
      setUsersOnline(prev => Math.max(1, Math.floor(prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 1000);
    
    scrollToBottom();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (newMessage.trim() !== '') {
      setIsTyping(true);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    } else {
      setIsTyping(false);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [newMessage]);

  const handleMinimize = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmMinimize = () => {
    setIsConfirmModalOpen(false);
    if (!isMinimized) {
      chatRef.current.style.animation = 'minimize 0.3s forwards';
      setTimeout(() => {
        chatRef.current.style.transform = 'scale(0.1) translateY(100vh)';
        setIsMinimized(true);
      }, 300);
    } else {
      chatRef.current.style.animation = 'restore 0.3s forwards';
      setTimeout(() => {
        chatRef.current.style.transform = 'none';
        setIsMinimized(false);
      }, 300);
    }
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      const rect = chatRef.current.getBoundingClientRect();
      originalSize.current = {
        width: rect.width + 'px',
        height: rect.height + 'px'
      };

      chatRef.current.style.transition = 'all 0.3s';
      chatRef.current.style.position = 'fixed';
      chatRef.current.style.top = '0';
      chatRef.current.style.left = '0';
      chatRef.current.style.right = '0';
      chatRef.current.style.bottom = '0';
      chatRef.current.style.width = '100%';
      chatRef.current.style.height = '100%';
      chatRef.current.style.margin = '0';
      chatRef.current.style.maxWidth = 'none';
      chatRef.current.style.transform = 'none';
      chatRef.current.style.zIndex = '1000';
      setIsMaximized(true);
    } else {
      chatRef.current.style.transition = 'all 0.3s';
      chatRef.current.style.position = 'relative';
      chatRef.current.style.width = '800px';
      chatRef.current.style.height = '600px';
      chatRef.current.style.margin = '0';
      chatRef.current.style.top = 'auto';
      chatRef.current.style.left = 'auto';
      chatRef.current.style.right = 'auto';
      chatRef.current.style.bottom = 'auto';
      chatRef.current.style.zIndex = 'auto';
      setIsMaximized(false);
    }
  };

  const handleClose = () => {
    chatRef.current.style.animation = 'closeWindow 0.3s forwards';
    setTimeout(() => {
      window.location.href = '/';
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(),
      username,
      text: newMessage,
      avatar,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
    localStorage.setItem('avatar', newAvatar);
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <div 
      className="retro-chat" 
      ref={chatRef} 
      style={{ 
        width: '800px', 
        height: '600px',
        margin: 0
      }}
    >
      <div className="retro-header">
        <div className="retro-title">{t('chatTitle')}</div>
        <div className="retro-window-controls">
          <button 
            type="button" 
            className="window-control-button language-button" 
            onClick={toggleLanguage}
          >
            {language === 'es' ? 'ES → EN' : 'EN → ES'}
          </button>
          <button className="window-control-button minimize" onClick={handleMinimize}>_</button>
          <button className="window-control-button maximize" onClick={handleMaximize}>□</button>
          <button className="window-control-button" onClick={handleClose}>×</button>
        </div>
      </div>

      <div className="retro-messages">
        {messages.length === 0 ? (
          <div className="retro-welcome">
            <h3>{t('welcome')}</h3>
            <p>{t('welcomeMessage')}</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="retro-message">
              <div className="retro-message-header">
                <div className="retro-avatar">{message.avatar}</div>
                <span className="retro-username">{message.username}</span>
                <span className="retro-timestamp">{message.timestamp}</span>
              </div>
              <div className="retro-message-content">
                {message.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="retro-input-area">
        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            className="retro-avatar" 
            style={{ cursor: 'pointer' }} 
            onClick={() => setIsAvatarModalOpen(true)}
            title="Haz clic para cambiar tu avatar"
          >
            {avatar}
          </div>
          <span className="retro-username">{username}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('messagePlaceholder')}
            className="retro-input"
          />
          <button type="submit" className="retro-button">
            {t('sendButton')}
          </button>
        </form>
      </div>

      <div className="retro-status-bar">
        <div>{t('usersOnline')} {usersOnline}</div>
        {isTyping && (
          <div className="retro-typing">
            {t('typing')}
            <div className="retro-typing-dots">
              <span className="retro-typing-dot" style={{animation: 'typingBounce 0.6s infinite ease-in-out both'}}></span>
              <span className="retro-typing-dot" style={{animation: 'typingBounce 0.6s infinite ease-in-out both', animationDelay: '0.2s'}}></span>
              <span className="retro-typing-dot" style={{animation: 'typingBounce 0.6s infinite ease-in-out both', animationDelay: '0.4s'}}></span>
            </div>
          </div>
        )}
      </div>

      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSelect={handleAvatarChange}
        currentAvatar={avatar}
        avatars={avatars}
        title={t('selectAvatar')}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmMinimize}
        message={t('minimizeConfirmMessage')}
        title={t('minimizeConfirmTitle')}
        acceptText={t('accept')}
        cancelText={t('cancel')}
      />
    </div>
  );
};

export default ChatPage; 