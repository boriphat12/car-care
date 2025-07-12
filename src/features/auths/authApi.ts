import axios from "axios";

const baseUrl = 'http://localhost:3001/api/auth';

const login = async (email: string, password: string) => {
    const response = await axios.post(`${baseUrl}/login`, {email, password})
    return {
        token: response.data.token,
        user: {
            name: response.data.user.name,
            email: response.data.user.email,
            id: response.data.user.id
        }
    }
}

    
export default login