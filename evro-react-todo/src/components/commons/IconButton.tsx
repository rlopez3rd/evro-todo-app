import { cn } from '@/utils/cn';
import { ReactNode, FC } from 'react';

interface IconButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  children,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={cn(
        'rounded-full p-1 hover:opacity-50 hover:cursor-pointer',
        'transition duration-300 scale-95 hover:scale-110',
        disabled && 'hover:opacity-100 hover:cursor-not-allowed',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
