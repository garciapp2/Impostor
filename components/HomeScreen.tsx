
import React from 'react';

interface HomeScreenProps {
  onPlay: () => void;
}

// Inject animation styles
const style = `
  @keyframes blink {
    0%, 90%, 100% {
      transform: scaleY(1);
    }
    95% {
      transform: scaleY(0.1);
    }
  }
  .animate-blink {
    animation: blink 3s infinite;
    transform-origin: center;
  }

  @keyframes point-right {
    0%, 100% {
      transform: translateX(-65px);
    }
    50% {
      transform: translateX(-55px);
    }
  }
  .animate-point-right {
    animation: point-right 2.5s ease-in-out infinite;
  }

  @keyframes seesaw {
    0%, 100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }
  .animate-seesaw {
    animation: seesaw 3s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  .animate-bounce {
    animation: bounce 2.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  .animate-pulse {
    animation: pulse 2.5s ease-in-out infinite;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);


const BrandIcon: React.FC = () => (
    <div className="relative flex items-center justify-center w-48 h-48 mb-8">
        {/* Eye Icon in the back */}
        <div className="absolute w-36 h-36 rounded-full bg-white shadow-lg border-4 border-sky-100 flex items-center justify-center" style={{transform: 'translateX(65px) scale(0.95)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-sky-500 animate-blink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </div>
        {/* Arrow Icon in the front */}
        <div className="absolute w-36 h-36 rounded-full bg-white shadow-lg border-4 border-pink-100 flex items-center justify-center animate-point-right">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
             </svg>
        </div>
    </div>
);


const HomeScreen: React.FC<HomeScreenProps> = ({ onPlay }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">

      <BrandIcon/>

      <h1 className="text-7xl md:text-8xl text-pink-500 drop-shadow-md animate-seesaw" style={{ letterSpacing: '0.1em' }}>
        IMPOSTOR
      </h1>
      <h2 className="text-8xl md:text-9xl text-sky-400 drop-shadow-md -mt-4 animate-bounce" style={{ letterSpacing: '0.2em' }}>
        APP
      </h2>
      
      <button
        onClick={onPlay}
        className="text-5xl bg-pink-500 text-white px-16 py-5 rounded-full shadow-lg hover:shadow-xl active:scale-95 transform transition-all duration-150 ease-in-out mt-12 bg-gradient-to-br from-pink-500 to-red-500 animate-pulse"
      >
        Jogar
      </button>

      <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-full px-6 py-2 flex items-center space-x-4">
        <p className="text-xl text-sky-600">3-20 Jogadores</p>
        <p className="text-sky-400 text-2xl">•</p>
        <p className="text-xl text-sky-600">100% Offline</p>
      </div>

    </div>
  );
};

export default HomeScreen;
