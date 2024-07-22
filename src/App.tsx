import React, { useState } from 'react';
import UserCard from "./components/userCard.tsx";

const App: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [searchTerms, setSearchTerms] = useState<string[]>([]);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleSearchChange = (query: string) => {
        if (!searchTerms.includes(query)) {
            setSearchTerms(prevTerms => [...prevTerms, query]);
            setPage(1);
        }
    };

    const handleTagRemove = (index: number) => {
        setSearchTerms(prevTerms => prevTerms.filter((_, i) => i !== index));
        setPage(1);
    };

    return (
        <div className="App bg-gray-100 min-h-screen p-4 flex flex-col items-center w-full">
            <header className="container mx-auto">
                <UserCard page={page} searchTerms={searchTerms} onSearchChange={handleSearchChange} onTagRemove={handleTagRemove} />
                <div className="flex justify-center mt-4 w-full max-w-2xl mx-auto">
                    <button
                        className="bg-blue-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                        onClick={handleNextPage}
                    >
                        Suivant 😎
                    </button>
                </div>
            </header>
        </div>
    );
};

export default App;
