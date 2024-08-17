import React from 'react';

const InputBoxDropDown = ({ type, title, value, setValue, list = [], error, name }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const selectOption = (option) => {
        if (isOpen) {
            setIsOpen(false);
        }
        setValue(option, name);
        setIsOpen(false); // Clear search term after selection
    };

    const handleSearchChange = (e) => {
        e.preventDefault();
        if (!isOpen) {
            setIsOpen(true);
        }
        setValue(e.target.value, name);
    };

    // console.log('Search Value:', value);
    // console.log('List:', list);
    // console.log('Filtered List:', filteredList);

    const searchTerm = (value || '').toLowerCase();
    console.log(typeof searchTerm)
    const filteredList = list.filter(el => {
        const nameMatch = el.name.toLowerCase().includes(searchTerm);
        // Convert value to string for comparison
        const valueMatch = String(el.value).toLowerCase().includes(searchTerm);
        // console.log(searchTerm)

        return nameMatch || valueMatch;
    });



    return (
        <div className="w-full">
            {type === "dropdown" && (
                <div className="w-full">
                    <div className={`relative max-w-[150px] px-3 py-2 border 
                        ${(value?.length > 0 || isOpen) ? 'border-orange-500' : 'border-gray-300'}
                         rounded ${error ? 'border-red-500' : ''}`}
                    >
                        <label htmlFor="search" className={`absolute top-[-0.70rem] left-2 bg-white px-1 ${(value?.length > 0 || isOpen) ? 'text-orange-500' : 'text-gray-500'} ${error ? 'text-red-500' : ''} text-primary-500 text-xs`}>{title}</label>
                        <div className="flex ">
                            <input
                                type="search"
                                value={value}
                                placeholder=''
                                onChange={handleSearchChange}
                                className="flex-1 w-full bg-transparent border-none outline-none text-gray-600 text-ellipsis"
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
                            <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-[200px] overflow-y-scroll overflow-x-hidden custom-scrollbar">
                                {filteredList.length > 0 && filteredList.map((el) => (
                                    <li
                                        key={el.id + name}
                                        onClick={() => selectOption(el?.value)}
                                        className="p-3 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {name == "countryCode" ? el?.value + " " + el?.name : el?.name}
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
                            name={name}
                            id="inputbox"
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value, name)}
                            placeholder=""
                            className={`peer w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 placeholder-transparent focus:outline-none focus:ring-0 focus:border-orange-500 ${value?.length > 0 ? 'border-orange-500' : ''} ${error ? 'border-red-500' : ''}`}
                        />
                        <label
                            htmlFor="inputbox"
                            className={`absolute bg-white px-1 left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 transition-all duration-300 
                                ${value?.length > 0 ? '-top-0.5 text-orange-500 text-xs' : 'peer-focus:-top-0.5 peer-focus:text-orange-500 peer-focus:text-xs'}
                                 ${error ? 'text-red-500' : ''}`}
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
