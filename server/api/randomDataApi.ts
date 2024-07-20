import axios from "axios";
import { User } from "../type/User.type";
import { Beer } from "../type/Beer.type";

const uri = "https://random-data-api.com/api/v2";

export const randomDataApi = {
  getUsers: async (size: number): Promise<User[]> => {
    try {
      let res = await axios.get(`${uri}/users`, {
        params: {
          size,
        },
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error && error.response) {
        throw error.response.data.error_message;
      } else {
        throw new Error("Something went wrong!");
      }
    }
  },
  getBeers: async (size: number): Promise<Beer[]> => {
    try {
      let res = await axios.get(`${uri}/beers`, {
        params: {
          size,
        },
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error && error.response) {
        throw error.response.data.error_message;
      } else {
        throw new Error("Something went wrong!");
      }
    }
  },
};
