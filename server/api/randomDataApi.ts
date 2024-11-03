import axios from "axios"
import { Beer } from "../type/Beer.type"

const uri = "https://random-data-api.com/api/v2"

export const randomDataApi = {
  getBeers: async (size: number): Promise<Beer[]> => {
    try {
      let res = await axios.get(`${uri}/beers`, {
        params: {
          size,
        },
      })

      return res.data
    } catch (error) {
      if (axios.isAxiosError(error) && error && error.response) {
        console.log(error.response.statusText)
        throw error.response.statusText
      } else {
        throw new Error("Something went wrong!")
      }
    }
  },
}
