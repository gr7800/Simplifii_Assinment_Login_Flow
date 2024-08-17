import React from 'react';

const CustomButton = ({ title, handleClick, type, className, disable, loading }) => {
    return (
        <button
            type={type}
            className={`bg-orange-500 text-white text-sm font-medium rounded-full px-3 py-2 shadow-md w-full mt-4 border-none ${className} ${disable ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClick}
            disabled={disable}
        >
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                </div>
            ) : (
                title
            )}
        </button>
    );
};

export default CustomButton;
