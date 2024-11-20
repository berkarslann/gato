import axios from "axios";
import { AppWindow } from "../components/OperationArea/OperationArea";

export const addNewWindow = async (window: AppWindow): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/window/new-window",
      window
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error adding new window:", (error as Error).message);
    throw error;
  }
};

export const updateWindow = async (window: AppWindow): Promise<any> => {
  try {
    console.log(window)
    const response = await axios.put(
      `http://localhost:8080/window/${window.id}`,
      window
    );
    

    return response.data;
  } catch (error) {
    console.error("Error updating the window:", (error as Error).message);
    throw error;
  }
};

export const getProjectWindows = async (projectId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/project/${projectId}`
    );
    console.log('burada', response)
    return response.data.windows;
  } catch (error) {
    console.error("Error adding new window:", (error as Error).message);
    throw error;
  }
};
