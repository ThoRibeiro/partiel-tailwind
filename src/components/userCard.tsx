import React, { useEffect, useState, KeyboardEvent } from 'react';
import userService from '../services/userService';
import { ApiResponse, User, UserCardProps } from '../interfaces/user';
import listLogo from "../assets/list.svg";
import cardLogo from "../assets/card.svg";

const UserCard: React.FC<UserCardProps> = ({ page, searchTerms, onSearchChange, onTagRemove }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isCardView, setIsCardView] = useState<boolean>(true);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response: ApiResponse = await userService.getUsers(page, searchTerms);
                if (page === 1) {
                    setUsers(response.data);
                } else {
                    setUsers(prevUsers => [...prevUsers, ...response.data]);
                }
                setTotalCount(response.count);
            } catch (error) {
                console.error('Une erreur est survenue pour récupérer les données!', error);
            }
        };

        fetchUsers();
    }, [page, searchTerms]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchQuery.trim()) {
            onSearchChange(searchQuery.trim());
            setSearchQuery('');
        }
    };

    if (!users.length) return <div>Chargement...</div>;

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex items-center w-full mb-10 mt-10">
                <div className="relative flex items-center w-full">
                    <div className="flex items-center border rounded w-full p-2 space-x-2 bg-white">
                        {searchTerms.map((term, index) => (
                            <div key={index} className="bg-white text-blue-500 border border-blue-500 font-bold py-2 px-3 rounded-full flex items-center space-x-1">
                                <span>{term}</span>
                                <button
                                    className="rounded-full items-center flex justify-center text-blue-500 mr-10"
                                    onClick={() => onTagRemove(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            className="flex-grow p-1 border-none outline-none"
                            placeholder="Recherche d'un utilisateur"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="flex ml-4">
                        <button
                            className={`px-4 py-2 border rounded-l hover:bg-gray-500 ${isCardView ? 'bg-blue-500 text' : 'bg-gray-400'}`}
                            onClick={() => setIsCardView(true)}
                        >
                            <img src={cardLogo} alt="Card View" className="w-7 h-7 text-white" />
                        </button>
                        <button
                            className={`px-4 py-2 border rounded-r hover:bg-gray-500 ${!isCardView ? 'bg-blue-500 text-white' : 'bg-gray-400'}`}
                            onClick={() => setIsCardView(false)}
                        >
                            <img src={listLogo} alt="List View" className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </div>
            {isCardView ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
                            <img className="w-full h-48 object-cover" src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
                            <div className="p-4">
                                <div className="font-bold text-xl mb-2 text-gray-800">{user.firstName} {user.lastName}</div>
                                <p className="text-gray-600 mb-2">{user.jobTitle}</p>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full">
                    {users.map((user, index) => (
                        <div key={user.id} className={`rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 mb-4 p-4 flex items-center justify-between ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                            <div>
                                <div className="font-bold text-xl mb-2 text-gray-800">{user.firstName} {user.lastName}</div>
                                <p className="text-gray-600 mb-2">{user.jobTitle}</p>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                            <img className="w-16 h-16 object-cover rounded-full" src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-4 text-gray-600">
                {users.length}/{totalCount}
            </div>
        </div>
    );
};

export default UserCard;
