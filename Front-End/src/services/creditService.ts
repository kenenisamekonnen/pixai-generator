import apiCLient from "./api";


export const getUserCredit = async (): Promise<number> => {
    try {
        const response = await apiCLient.get("/auth/credits");
        return response.data.credit;
    } catch (error) {
        console.error("Failed to fetch user credits", error);
        return 0; // Return 0 or handle the error as needed
    }
}