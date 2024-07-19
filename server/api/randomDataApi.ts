import axios, { AxiosRequestConfig } from "axios";
import { User } from "../type/User.type";

// Todo: Add logic to get the correct uri based on the environment
const uri = "https://random-data-api.com/api/v2/users";

export const randomDataApi = {
  getUsers: async (size: number): Promise<User[]> => {
    try {
      let res = await axios.get(uri, {
        params: {
          size,
        },
      });

      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error && error.response) {
        // Todo: We should not pass the error given by an external API, but create a custom message to have a better experience
        throw error.response.data.error_message;
      } else {
        throw new Error("Something went wrong!");
      }
    }
  },
};
