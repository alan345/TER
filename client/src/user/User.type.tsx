import type { AppRouter } from "../../../server";
import type { inferRouterOutputs } from "@trpc/server";
type RouterOutputs = inferRouterOutputs<AppRouter>;

export type Worker = RouterOutputs["createWorker"];
