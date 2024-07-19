import axios, { AxiosRequestConfig } from "axios";
import { Worker } from "../type/Worker.type";

// Todo: Add logic to get the correct uri based on the environment
const uriWorkers = "https://api-sandbox.checkrpay.com/customer/v0/workers";
const uriPayout = "https://api-sandbox.checkrpay.com/customer/v0/payouts";
// https://random-data-api.com/api/v2/users?size=10
export const checkrPay = {
  getHeaders: () => {
    const headers: AxiosRequestConfig["headers"] = {
      "Content-Type": "application/json",
      "X-CHECKR-PAY-ACCESS-KEY": process.env.CHECKR_PAY_ACCESS_KEY,
      "X-CHECKR-PAY-SECRET-KEY": process.env.CHECKR_PAY_SECRET_KEY,
    };
    return headers;
  },
  createWorker: async (phoneNumber: string, email: string): Promise<Worker> => {
    try {
      let res = await axios.post(
        uriWorkers,
        {
          profile: {
            phoneNumber,
            email,
          },
        },
        {
          headers: checkrPay.getHeaders(),
        }
      );
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
  closeWorker: async (id: string) => {
    try {
      let res = await axios.delete(`${uriWorkers}/${id}`, {
        headers: checkrPay.getHeaders(),
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
  payWorker: async (amount: number, workerId: string) => {
    try {
      let res = await axios.post(
        uriPayout,
        {
          workerId,
          description: "Payment from ElderBolt",
          amountCents: amount * 100,
        },
        {
          headers: checkrPay.getHeaders(),
        }
      );
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
      let res = await axios.get(uriWorkers, {
        params: {
          page,
          per_page: 10,
        },
        headers: checkrPay.getHeaders(),
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
