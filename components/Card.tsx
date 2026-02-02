
import React, { useState } from 'react';

// Paleta base mais vibrante e saturada
const COLOR_PALETTE = [
  { base: '#FFB347', darker: '#FF9500' }, // Golden Sand - mais vibrante
  { base: '#FF6B9D', darker: '#FF4D7A' }, // Coral - rosa mais saturado
  { base: '#FF8FA3', darker: '#FF6B85' }, // Wild Watermelon - rosa vibrante
  { base: '#7FCDCD', darker: '#5FB3B3' }, // Peace - azul-turquesa mais vivo
  { base: '#5DADE2', darker: '#3498DB' }, // French Sky Blue - azul mais saturado
  { base: '#85C1E2', darker: '#5DADE2' }, // Saturated Sky - azul médio vibrante
  { base: '#82E0AA', darker: '#58D68D' }, // Lime Soap - verde mais vivo
  { base: '#52E252', darker: '#2ECC71' }, // UFO Green - verde vibrante
  { base: '#74B9FF', darker: '#0984E3' }, // Clear Chill - azul claro vibrante
  { base: '#6C5CE7', darker: '#5F3DC4' }, // Bright Greek - azul profundo
  { base: '#A29BFE', darker: '#6C5CE7' }, // Roxo suave
  { base: '#FD79A8', darker: '#E84393' }, // Rosa vibrante
  { base: '#FDCB6E', darker: '#E17055' }, // Laranja vibrante
  { base: '#55EFC4', darker: '#00B894' }, // Verde água
  { base: '#81ECEC', darker: '#00CEC9' }, // Ciano vibrante
];

// Função para gerar cores dinamicamente baseadas no índice
export const getCardColors = (index: number): string[] => {
  const colorIndex = index % COLOR_PALETTE.length;
  const color = COLOR_PALETTE[colorIndex];
  return [color.base, color.darker];
};

const IMPOSTER_COLORS = ["#d32f2f", "#c62828"];

interface CardProps {
  frontContent: string;
  backContent: string;
  category: string;
  isImposter: boolean;
  colors: string[];
}

const Card: React.FC<CardProps> = ({ frontContent, backContent, category, isImposter, colors }) => {
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
          {!isImposter && category && (
            <span className="text-xs font-medium opacity-90 absolute top-6 left-0 right-0 text-center select-none">Categoria: {category}</span>
          )}
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs uppercase tracking-wider opacity-90 mb-4 select-none">{isImposter ? 'Sua Identidade' : 'A Palavra Secreta é'}</span>
            <span className="text-3xl font-bold text-center break-words leading-tight select-none">{backContent}</span>
          </div>
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
