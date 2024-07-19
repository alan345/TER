import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { checkrPay } from "../api/checkrPay";

export const workerRouter = router({
  getWorkers: publicProcedure
    .input(
      z.object({
        page: z.number(),
      })
    )
    .query(async ({ input }) => {
      let data = await checkrPay.getWorkers(input.page);

      return data;
    }),
  createWorker: publicProcedure
    .input(
      z.object({
        phone: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let data = await checkrPay.createWorker(input.phone, input.email);
      return data;
    }),

  closeWorker: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let data = await checkrPay.closeWorker(input.id);

      return data;
    }),
  payWorker: publicProcedure
    .input(
      z.object({
        amount: z.number(),
        workerId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.amount > 1000000) {
        throw new Error("Amount must be less than 1000000");
      }
      if (input.amount < 0) {
        throw new Error("Amount must be greater than 0");
      }

      let data = await checkrPay.payWorker(input.amount, input.workerId);
      console.log(data);
      return data;
    }),
});
