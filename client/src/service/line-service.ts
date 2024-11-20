import axios from "axios";
import { Line } from "../components/OperationArea/OperationArea";

export const addNewLine = async (line: Line): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/line/new-line",
      line
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding new line:", (error as Error).message);
    throw error;
  }
};

export const getProjectLines = async (projectId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/line/get-lines/${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new line:", (error as Error).message);
    throw error;
  }
};

export const updateLine = async (line: Line): Promise<any> => {
  try {
    const response = await axios.put(
      `http://localhost:8080/line/${line.id}`,
      line
    );
    return response.data;
  } catch (error) {
    console.error("Error updating the line:", (error as Error).message);
    throw error;
  }
};
