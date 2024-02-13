import axios from "axios";

export const http = {

    get: async (url: string, headers: any) => {
        try {
            const { data } = await axios.get(url, { headers });
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },

    post: async (url: string, body: any, headers: any) => {
        try {
            const { data } = await axios.post(url, body, { headers });
            return data;
        } catch (error) {
            // Handle the error, such as logging or rethrowing
            throw error;
        }
    }
}