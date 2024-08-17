import React from 'react';
import Loader from './Loader/Loader';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    variant?: 'border' | 'default';
    className?: String;
}

const Button = ({
    children,
    onClick,
    disabled = false,
    isLoading = false,
    variant = 'default',
    className
}: ButtonProps) => {
    const buttonClassNames = `${className} text-sm font-bold max-w-max h-[40px] flex flex-row items-center justify-center gap-3 px-5 rounded-full trans hover:opacity-80 ${variant === 'border'
        ? 'bg-[var(--white)] border-[1px] border-solid border-[var(--voilet)] text-[var(--voilet)]'
        : 'bg-[var(--voilet)] text-white'
        } ${isLoading || disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`;

    return (
        <button
            className={buttonClassNames}
            disabled={isLoading || disabled}
            onClick={onClick}
        >
            {isLoading ? (
                <div className={`flex flex-row items-center gap-2 font-bold ${variant === 'border' ? 'text-[var(--voilet)]' : 'text-[var(--white)]'}`}>
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
