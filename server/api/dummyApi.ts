import axios from "axios";
import { Movie } from "../type/Movie";

const uri = "https://dummyapi.online/api";

export const dummyApi = {
  getMovies: async (size: number): Promise<Movie[]> => {
    try {
      let res = await axios.get(`${uri}/movies`, {
        params: {
          size,
        },
      });

      return res.data;
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
