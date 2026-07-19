import React from 'react';

interface HapticButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  enabled: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

const IOS_SWITCH_ATTRIBUTE = { switch: '' } as React.InputHTMLAttributes<HTMLInputElement>;

/** Uses a real Safari switch so iOS can respond to the user's trusted tap. */
const HapticButton: React.FC<HapticButtonProps> = ({
  children,
  onClick,
  enabled,
  disabled = false,
  className = '',
  style,
  ariaLabel,
}) => {
  if (!enabled) {
    return (
      <button type="button" onClick={onClick} disabled={disabled} className={className} style={style} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  return (
    <label
      className={`relative flex items-center justify-center ${disabled ? 'pointer-events-none' : 'cursor-pointer'} ${className}`}
      style={style}
      aria-disabled={disabled}
    >
      <input
        {...IOS_SWITCH_ATTRIBUTE}
        type="checkbox"
        disabled={disabled}
        onChange={onClick}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        aria-label={ariaLabel}
      />
      <span className="pointer-events-none">{children}</span>
    </label>
  );
};

export default HapticButton;
