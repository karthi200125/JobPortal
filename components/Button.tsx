import React from 'react';
import Loader from './Loader/Loader';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: any;
    disabled?: boolean;
    isLoading?: boolean;
    variant?: 'border' | 'default';
    className?: String;
    icon?: any;
}

const Button = ({
    children,
    onClick,
    disabled,
    isLoading = false,
    variant = 'default',
    className,
    icon,
}: ButtonProps) => {
    const buttonClassNames = `${className} text-sm font-bold  h-[40px] flex flex-row items-center justify-center gap-2 px-5 rounded-full trans hover:opacity-80 ${variant === 'border'
        ? 'bg-[var(--white)] border-[1px] border-solid border-[var(--voilet)] text-[var(--voilet)]'
        : 'bg-[var(--voilet)] text-white'
        } ${(isLoading || disabled) ? 'cursor-not-allowed opacity-50 hover:opacity-50' : 'cursor-pointer'}`;

    return (
        <button
            className={buttonClassNames}
            disabled={isLoading || disabled}
            onClick={onClick}
        >
            {!isLoading &&
                <div>{icon}</div>
            }

            {isLoading ? (
                <div className={`flex flex-row items-center gap-2 font-bold ${variant === 'border' ? 'text-[var(--voilet)]' : ''}`}>
                    <Loader />
                    <h4 >Loading</h4>
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
