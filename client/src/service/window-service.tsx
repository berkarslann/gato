import axios from "axios";
import { AppWindow } from "../components/operation-area/operation-area";

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
    console.log('burda window', window)
    const response = await axios.put(
      `http://localhost:8080/window/${window.id}`,
      window
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error updating the window:", (error as Error).message);
    throw error;
  }
};
