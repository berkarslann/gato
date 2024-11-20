import axios from "axios";

export const getProjectComponents = async (projectId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/project/${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new window:", (error as Error).message);
    throw error;
  }
};

