import React, { useState, useEffect } from 'react';

const InputBoxDropDown = ({ type, title, value, setValue, list = [], error, name }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
        setHasValue(value.length > 0);
    }, [value]);

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const selectOption = (option) => {
        setValue(option, name);
        setIsOpen(false);
    };

    const handleSearchChange = (e) => {
        setValue(e.target.value, name);
        if (!isOpen) setIsOpen(true);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setHasValue(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value.length > 0);
    };

    const searchTerm = (value || '').toLowerCase();
    const filteredList = list.filter(el => {
        const nameMatch = el.name.toLowerCase().includes(searchTerm);
        const valueMatch = String(el.value).toLowerCase().includes(searchTerm);
        return nameMatch || valueMatch;
    });

    return (
        <div className="w-full">
            {type === "dropdown" && (
                <div className="w-full">
                    <div className={`relative max-w-[150px] px-3 py-2 border
                        ${(hasValue || isOpen) ? 'border-orange-500' : 'border-gray-300'}
                        rounded ${error ? 'border-red-500' : ''}`}
                    >
                        <label
                            htmlFor={name}
                            className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-all bg-white px-1 cursor-pointer
                            ${hasValue || isFocused ? 'top-[-3px] text-[11px]' : ''}
                            ${error ? 'text-red-500' : hasValue || isFocused ? 'text-[rgb(236,147,36)]' : 'text-gray-500'}`}
                        >
                            {title}
                        </label>
                        <div className="flex">
                            <input
                                id={name}
                                type="search"
                                value={value}
                                onChange={handleSearchChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder=""
                                className="flex-1 w-full bg-transparent border-none outline-none text-gray-600"
                            />
                            <button
                                className="flex items-center justify-center bg-white text-gray-600 relative"
                                onClick={toggleDropdown}
                            >
                                {!isOpen ? (
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M7 10l5 5 5-5H7z"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        transform="matrix(-1, 0, 0, 1, 0, 0) rotate(180)"
                                    >
                                        <path d="M7 10l5 5 5-5H7z"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {isOpen && (
                            <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-[200px] overflow-y-scroll overflow-x-hidden">
                                {filteredList.length > 0 && filteredList.map((el) => (
                                    <li
                                        key={el.id + name}
                                        onClick={() => selectOption(el?.value)}
                                        className="p-3 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {name === "countryCode" ? el?.value + " " + el?.name : el?.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {error && (
                        <p className={`text-red-500 text-sm font-normal text-center`}>{error}</p>
                    )}
                </div>
            )}
            {type === "inputbox" && (
                <div className="w-full">
                    <div className="relative w-full">
                        <input
                            id={name}
                            name={name}
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value, name)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder=""
                            className={`peer w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 placeholder-transparent focus:outline-none focus:ring-0
                            ${hasValue ? 'border-orange-500' : 'border-gray-300'}
                            ${error ? 'border-red-500' : ''}
                            ${isFocused ? 'focus:border-[rgb(236,147,36)]' : 'focus:border-gray-300'}`}
                        />
                        <label
                            htmlFor={name}
                            className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-all bg-white px-1 cursor-pointer
                            ${hasValue || isFocused ? 'top-[-3px] text-[11px]' : 'text-gray-500'}
                            ${error ? 'text-red-500' : hasValue || isFocused ? 'text-[rgb(236,147,36)]' : 'text-gray-500'}`}
                        >
                            {title}
                        </label>
                    </div>
                    {error && (
                        <p className={`text-red-500 text-sm font-normal text-center`}>{error}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default InputBoxDropDown;
