import axios from "axios";
import { Movie } from "../type/Movie";
import { Album } from "../type/Album";

const uri = "https://jsonplaceholder.typicode.com";

export const jsonPlaceholderApi = {
  getAlbums: async (size: number): Promise<Album[]> => {
    try {
      let res = await axios.get(`${uri}/albums`, {
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
