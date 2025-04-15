import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/retro.css';
import { useLanguage } from '../context/LanguageContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();
  const [selectedName, setSelectedName] = useState('');
  const [customName, setCustomName] = useState('');
  const [theme, setTheme] = useState('windows95');

  const funnyNames = [
    { name: 'Sr. :)', emoji: ':)' },
    { name: 'Dr. Tristín', emoji: ':(' },
    { name: 'Felizardo', emoji: ':D' },
    { name: 'Pacman Jr.', emoji: ':v' },
    { name: 'Kawaiineko', emoji: 'uwu' },
    { name: 'Tristón 3000', emoji: ':c' },
    { name: 'MegaEnojado', emoji: '>:c' },
    { name: 'Ojitos Felices', emoji: '^_^' },
    { name: 'Sorprendido.exe', emoji: 'o_o' },
    { name: 'NotAmused.bat', emoji: '-_-' }
  ];

  const themes = [
    { id: 'windows95', name: 'Windows 95' }, 
    { id: 'sketch-claro', name: 'Sketch Claro' }, 
    { id: 'sketch', name: 'Sketch' }, 
    { id: 'bluescreen', name: 'Blue Screen of Death' }, 
    { id: 'amiga', name: 'Amiga' },
    { id: 'gameboy', name: 'GameBoy' },
    { id: 'tamagotchi', name: 'T-Gotchi!' },
    { id: 'vintage', name: 'Vintage Café' },
    { id: 'vaporwave', name: 'Vaporwave' },
    { id: 'aesthetic', name: 'Aesthetic Pink' },
    { id: 'emo', name: 'Emo Dark' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon' },
    { id: 'scarlet', name: 'Scarlet Night' },
    { id: 'matrix', name: 'Matrix' },
    { id: 'balatro', name: 'Balatro' }
  ];

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = customName || selectedName || funnyNames[0].name;
    localStorage.setItem('username', finalName);
    localStorage.setItem('theme', theme);
    navigate('/chat');
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <div className="retro-login">
      <div className="retro-login-header">
        <div>{t('loginTitle')}</div>
        <div className="retro-window-controls">
          <button 
            type="button" 
            className="retro-button language-button" 
            onClick={toggleLanguage}
          >
            {language === 'es' ? 'ES → EN' : 'EN → ES'}
          </button>
          <button className="retro-button">_</button>
          <button className="retro-button">□</button>
          <button className="retro-button">×</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="retro-login-content">
        <label className="retro-label">{t('selectName')}</label>
        <select 
          className="retro-select"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value="">{t('selectOption')}</option>
          {funnyNames.map((item) => (
            <option key={item.name} value={item.name}>
              {item.emoji} {item.name}
            </option>
          ))}
        </select>

        <label className="retro-label">{t('customName')}</label>
        <input
          type="text"
          className="retro-input"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder={t('customNamePlaceholder')}
        />

        <label className="retro-label">{t('selectTheme')}</label>
        <select 
          className="retro-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {themes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <button type="submit" className="retro-button" style={{ width: '100%', marginTop: '16px' }}>
          {t('loginButton')}
        </button>
      </form>
    </div>
  );
};

export default LoginPage; 