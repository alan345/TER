import axios from "axios";
import { Movie } from "../type/Movie.type";
import { Album } from "../type/Album";
import { Photo } from "../type/Photo.type";

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
  getPhotos: async (size: number): Promise<Photo[]> => {
    try {
      let res = await axios.get(`${uri}/photos`, {
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
