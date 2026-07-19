import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LogoProps {
  /** Height of the wordmark (any CSS size). */
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Proporção real do arquivo logo.png (662 x 192).
const LOGO_RATIO = '662 / 192';

/**
 * A marca "impostor" (o "t" em forma de faca).
 *
 * No tema Clássico usa a imagem original (colorida). Nos demais temas, a logo
 * é recolorida pela cor do tema usando o PNG como máscara (mask-image), assim
 * cada tema tem sua própria cor de marca, definida por --logo-fill no themes.css.
 */
const Logo: React.FC<LogoProps> = ({ height, className, style }) => {
  const { theme } = useTheme();

  if (theme === 'classic') {
    return (
      <img
        src="/logo.png"
        alt="impostor"
        draggable={false}
        className={className}
        style={{
          display: 'block',
          userSelect: 'none',
          ...(height ? { height, width: 'auto' } : {}),
          ...style,
        }}
      />
    );
  }

  // Versão recolorida por tema (máscara + preenchimento do tema).
  const maskStyle: React.CSSProperties = {
    display: 'block',
    userSelect: 'none',
    background: 'var(--logo-fill, currentColor)',
    WebkitMaskImage: 'url(/logo.png)',
    maskImage: 'url(/logo.png)',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    aspectRatio: LOGO_RATIO,
    ...(height ? { height, width: 'auto' } : {}),
    ...style,
  };

  return (
    <div
      role="img"
      aria-label="impostor"
      className={`theme-logo ${className ?? ''}`}
      style={maskStyle}
    />
  );
};

export default Logo;
