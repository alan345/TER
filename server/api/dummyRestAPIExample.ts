import axios from "axios";
import { Employee } from "../type/Employee";

const uri = "https://dummy.restapiexample.com/api/v1";

export const dummyRestAPIExample = {
  getEmployees: async (size: number): Promise<Employee[]> => {
    try {
      let res = await axios.get(`${uri}/employees`, {
        params: {
          size,
        },
      });

      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error && error.response) {
        console.log(error.response.statusText);
        throw error.response.statusText;
      } else {
        throw new Error("Something went wrong!");
      }
    }
  },
};
