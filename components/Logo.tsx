import React from 'react';

interface LogoProps {
  /** Height of the wordmark (any CSS size). */
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** The "impostor" wordmark (knife "t"), rendered from the brand image. */
const Logo: React.FC<LogoProps> = ({ height, className, style }) => (
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

export default Logo;
