import axios from 'axios';
import { ApiResponse } from '../interfaces/user';

const getUsers = async (page: number, terms: string[] = []): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>(`http://localhost:3000/user/${page}`, {
        terms
    });
    return response.data;
};

export default {
    getUsers,
};
