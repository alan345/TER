import axios, { AxiosRequestConfig } from "axios";
import { Worker } from "../type/Worker.type";

// Todo: Add logic to get the correct uri based on the environment
const uri = "https://random-data-api.com/api/v2/users?size=10";

export const randomDataApi = {
  createWorker: async (phoneNumber: string, email: string): Promise<Worker> => {
    try {
      let res = await axios.post(uri, {
        profile: {
          phoneNumber,
          email,
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error && error.response) {
        console.log(error.response.data);
        throw (
          // Todo: We should not pass the error given by an external API, but create a custom message to have a better experience
          error.response.data.error_message + ": " + error.response.data.details
        );
      } else {
        throw new Error("Something went wrong!");
      }
    }
  },

  getWorkers: async (
    page: number
  ): Promise<{ data: Worker[]; count: number }> => {
    try {
      let res = await axios.get(uri, {
        params: {
          page,
          per_page: 10,
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
