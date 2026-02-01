
import React, { useState } from 'react';

export const CARD_COLORS: string[][] = [
  ["#EF5350", "#E53935"],
  ["#8D6E63", "#6D4C41"],
  ["#66BB6A", "#43A047"],
  ["#FF9800", "#F57C00"],
  ["#78909C", "#546E7A"],
  ["#FFEB3B", "#FBC02D"],
  ["#42A5F5", "#1E88E5"],
  ["#EC407A", "#D81B60"],
  ["#AB47BC", "#8E24AA"],
];

const IMPOSTER_COLORS = ["#d32f2f", "#c62828"];

interface CardProps {
  frontContent: string;
  backContent: string;
  isImposter: boolean;
  colors: string[];
}

const Card: React.FC<CardProps> = ({ frontContent, backContent, isImposter, colors }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInteractionStart = () => setIsFlipped(true);
  const handleInteractionEnd = () => setIsFlipped(false);
  
  const frontGradientStyle = { backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`};
  const backGradientStyle = { backgroundImage: `linear-gradient(to bottom right, ${isImposter ? IMPOSTER_COLORS[0] : colors[0]}, ${isImposter ? IMPOSTER_COLORS[1] : colors[1]})`};

  return (
    <div
      className="w-full max-w-sm h-[400px] relative select-none"
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={(e) => {
        e.preventDefault();
        handleInteractionStart();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        handleInteractionEnd();
      }}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'manipulation' }}
    >
      <div
        className={`w-full h-full absolute transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Card Front */}
        <div style={{ ...frontGradientStyle, userSelect: 'none', WebkitUserSelect: 'none' }} className="absolute w-full h-full backface-hidden rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 text-white select-none">
            <span className="text-xs uppercase tracking-wider opacity-90 mb-4 select-none">PRÓXIMO JOGADOR</span>
            <span className="text-4xl font-bold text-center break-words leading-tight select-none">{frontContent.replace('Passe para ', '')}</span>
        </div>

        {/* Card Back */}
        <div style={{ ...backGradientStyle, userSelect: 'none', WebkitUserSelect: 'none' }} className={`absolute w-full h-full backface-hidden rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 rotate-y-180 text-white select-none`}>
          <span className="text-xs uppercase tracking-wider opacity-90 mb-4 select-none">{isImposter ? 'Sua Identidade' : 'A Palavra Secreta é'}</span>
          <span className="text-3xl font-bold text-center break-words leading-tight select-none">{backContent}</span>
        </div>
      </div>
    </div>
  );
};

// Add custom utilities to Tailwind config for 3D transforms if not using a JIT compiler
// In this setup with CDN, we rely on standard Tailwind classes.
// We'll define them here for clarity if needed, but modern Tailwind should support them.
const style = `
  .perspective-1000 { perspective: 1000px; }
  .transform-style-preserve-3d { transform-style: preserve-3d; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .backface-hidden { backface-visibility: hidden; }
`;
// Inject styles into head
const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);


export default Card;
