import { createContext, useState, useContext, useEffect } from 'react';

// Traducciones
const translations = {
  es: {
    // Login
    loginTitle: ':Chat - Login.exe',
    selectName: 'Selecciona tu nombre:',
    selectOption: '-- Selecciona un nombre --',
    customName: 'O escribe tu propio nombre:',
    customNamePlaceholder: 'Tu nombre personalizado...',
    selectTheme: 'Selecciona un tema:',
    loginButton: 'INICIAR SESIÓN.bat',
    
    // Chat
    chatTitle: ':Chat - Chat Global',
    welcome: '¡Bienvenido al chat!',
    welcomeMessage: 'Sé el primero en enviar un mensaje y comenzar la conversación.',
    messagePlaceholder: 'Escribe un mensaje...',
    sendButton: 'Enviar',
    usersOnline: 'Usuarios conectados:',
    typing: 'Escribiendo',
    selectAvatar: 'Seleccionar Avatar',
    minimizeConfirmTitle: '¿Estás seguro de minimizar?',
    minimizeConfirmMessage: '¿Estás seguro de hacerlo? Esto de verdad minimiza, yo te sugiero no presionarlo',
    accept: 'Aceptar',
    cancel: 'Cancelar'
  },
  en: {
    // Login
    loginTitle: ':Chat - Login.exe',
    selectName: 'Select your name:',
    selectOption: '-- Select a name --',
    customName: 'Or type your own name:',
    customNamePlaceholder: 'Your custom name...',
    selectTheme: 'Select a theme:',
    loginButton: 'LOGIN.bat',
    
    // Chat
    chatTitle: ':Chat - Global Chat',
    welcome: 'Welcome to the chat!',
    welcomeMessage: 'Be the first to send a message and start the conversation.',
    messagePlaceholder: 'Type a message...',
    sendButton: 'Send',
    usersOnline: 'Users online:',
    typing: 'Typing',
    selectAvatar: 'Select Avatar',
    minimizeConfirmTitle: 'Are you sure you want to minimize?',
    minimizeConfirmMessage: 'Are you sure you want to do this? This actually minimizes, I suggest not pressing it',
    accept: 'Accept',
    cancel: 'Cancel'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });
  
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 