
import React, { useState } from 'react';

interface RevealScreenProps {
  imposterName: string;
  onNext: () => void;
}

const RevealScreen: React.FC<RevealScreenProps> = ({ imposterName, onNext }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!isRevealed) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
             <div className="flex-grow flex flex-col items-center justify-center">
                <p className="text-5xl md:text-6xl text-sky-600">O impostor é...</p>
                <p className="text-3xl text-gray-500 mt-4">Chegou a hora da verdade!</p>
             </div>
            <button
                onClick={() => setIsRevealed(true)}
                className="text-4xl text-white px-10 py-4 rounded-full shadow-lg active:scale-95 transform transition-transform duration-150 ease-in-out bg-gradient-to-br from-pink-500 to-red-500"
            >
                Revelar Agora
            </button>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-around h-full text-center">
      <div className="w-full h-96 bg-red-600 text-white rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4 animate-reveal bg-gradient-to-br from-red-500 to-red-700">
          <p className="text-3xl opacity-80">O impostor era:</p>
          <p className="text-8xl mt-4 drop-shadow-lg">{imposterName}</p>
      </div>
       <button
        onClick={onNext}
        className="mt-8 text-4xl bg-sky-500 text-white px-10 py-4 rounded-full shadow-lg hover:bg-sky-600 active:scale-95 transform transition-transform duration-150 ease-in-out flex items-center"
      >
        Continuar
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  );
};

const style = `
  @keyframes reveal {
    0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  .animate-reveal {
    animation: reveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);


export default RevealScreen;
