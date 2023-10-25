import axios from 'axios';
import {baseURL, urls} from "../configs";

const axiosService = axios.create({ baseURL });

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axiosService.post(urls.login, { username, password });

        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export { axiosService };
