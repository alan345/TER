import axios from "axios";
import { Fact } from "../type/Fact.type";

const uri = "https://catfact.ninja";

export const catFactNinja = {
  getFacts: async (size: number): Promise<Fact[]> => {
    try {
      let res = await axios.get(`${uri}/facts`, {
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
