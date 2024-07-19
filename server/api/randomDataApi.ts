import axios from "axios";
import { User } from "../type/User.type";

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
        throw error.response.data.error_message;
      } else {
        throw new Error("Something went wrong!");
      }
    }
  },
};
