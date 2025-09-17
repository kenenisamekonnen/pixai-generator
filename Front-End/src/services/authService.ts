import type { LoginCredential, RegistrationData, User } from "../types/auth";
import apiCLient from "./api";

export const registerUser = async (userData: RegistrationData): Promise<User> => {
    try{
        const response = await apiCLient.post<User>("/auth/register", userData);
        return response.data;
    } catch (error){
        console.error("registeration failed")
        throw error;
        
    };
};

export const loginUser = async (credential: LoginCredential): Promise<{user: User, token: string}> => {

    try{
        const response = await apiCLient.post<{user: User, token: string}>("/auth/login", credential);
        if (response.data.token){
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    } catch(error){
        console.error("falied to login");
        throw error;
    }
};


export const logout = () => {
    localStorage.removeItem('authToken');
};

// --------------------
// Google OAuth
// --------------------
export const loginWithGoogle = async (
  googleToken: string
): Promise<{ user: User; token: string }> => {
  try {
    const response = await apiCLient.post<{ user: User; token: string }>(
      "/auth/google",
      { token: googleToken }
    );

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Google login failed", error);
    throw error;
  }
};