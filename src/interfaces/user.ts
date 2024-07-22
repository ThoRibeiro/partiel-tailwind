export interface User {
    id: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    imageUrl: string;
}

export interface ApiResponse {
    data: User[];
    count: number;
}

export interface UserCardProps {
    page: number;
    searchTerms: string[];
    onSearchChange: (query: string) => void;
    onTagRemove: (index: number) => void;
}