// "use client";

// import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
// import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";

// interface SuggestionBoxProps {
//     suggestions: string[];
//     onSelect: (value: string) => void;
// }

// export const SuggestionBox = ({ suggestions, onSelect }: SuggestionBoxProps) => {
//     const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
//     const [inputValue, setInputValue] = useState("");

//     useEffect(() => {
//         if (inputValue) {
//             const filtered = suggestions.filter((suggestion) =>
//                 suggestion.toLowerCase().includes(inputValue.toLowerCase())
//             );
//             setFilteredSuggestions(filtered);
//         } else {
//             setFilteredSuggestions([]);
//         }
//     }, [inputValue, suggestions]);

//     const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setInputValue(e.target.value);
//     };

//     const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Enter" && inputValue.trim()) {
//             e.preventDefault();
//             onSelect(inputValue.trim());
//             setInputValue("");
//             setFilteredSuggestions([]);
//         }
//     };

//     const handleSelect = (value: string) => {
//         onSelect(value);
//         setInputValue("");
//         setFilteredSuggestions([]);
//     };

//     return (
//         <div className="relative">
//             <Command>
//                 <CommandInput
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     onKeyDown={handleKeyDown}
//                     placeholder="Type to search..."
//                 />
//                 {filteredSuggestions.length > 0 && (
//                     <CommandList>
//                         {filteredSuggestions.map((suggestion) => (
//                             <CommandItem key={suggestion} onSelect={() => handleSelect(suggestion)}>
//                                 {suggestion}
//                             </CommandItem>
//                         ))}
//                     </CommandList>
//                 )}
//                 {filteredSuggestions.length === 0 && inputValue && (
//                     <CommandEmpty>No suggestions found.</CommandEmpty>
//                 )}
//             </Command>
//         </div>
//     );
// };

"use client";

import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";

interface SuggestionBoxProps {
    suggestions: string[];
    onSelect: (value: string) => void;
}

export const SuggestionBox = ({ suggestions, onSelect }: SuggestionBoxProps) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (inputValue) {
            const filtered = suggestions.filter((suggestion) =>
                suggestion.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    }, [inputValue, suggestions]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            onSelect(inputValue.trim());
            setInputValue("");
            setFilteredSuggestions([]);
        }
    };

    const handleSelect = (value: string) => {
        onSelect(value);
        setInputValue("");
        setFilteredSuggestions([]);
    };

    return (
        <div className="relative">
            <Command>
                <CommandInput
                    value={inputValue}
                    onValueChange={handleInputChange} // cmdk uses `onValueChange`
                    onKeyDown={handleKeyDown}
                    placeholder="Type to search..."
                />
                {filteredSuggestions.length > 0 && (
                    <CommandList>
                        {filteredSuggestions.map((suggestion) => (
                            <CommandItem key={suggestion} onSelect={() => handleSelect(suggestion)}>
                                {suggestion}
                            </CommandItem>
                        ))}
                    </CommandList>
                )}
                {filteredSuggestions.length === 0 && inputValue && (
                    <CommandEmpty>No suggestions found.</CommandEmpty>
                )}
            </Command>
        </div>
    );
};
