import axios from "axios";

let baseURL = `http://localhost:8080/api`;

export async function RegisterAPI(formData: any) {

    try {

        const response = await axios.post(`${baseURL}/auth/signup`, formData);

        return response;

    } catch (error) {

        console.log(error);

        return error;

    }

};

export async function LoginAPI(formData: any) {

    try {

        const response = await axios.post(`${baseURL}/auth/signin`, formData);

        return response;

    } catch (error) {

        console.log(error);

        return error;

    }

};

export async function UserAPI() {

    const token = localStorage.getItem("token");

    try {

        const response = await axios(`${baseURL}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {

        console.log(error);

        return error;

    }

};