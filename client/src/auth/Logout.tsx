import React from "react";
import { trpc } from "../utils/trpc";
import { AppContext } from "../ContextProvider";

export function Logout() {
  const context = React.useContext(AppContext);
  const createWorkerMutation = trpc.logout.useMutation({});
  const handleCreateWorker = () => {
    createWorkerMutation.mutate(undefined, {
      onSuccess: () => {
        console.log("success Logout");
        context.updateUserId();
      },
    });
  };
  return (
    <div>
      <button
        disabled={createWorkerMutation.isPending}
        onClick={handleCreateWorker}
        className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
      >
        {createWorkerMutation.isPending ? "Closing..." : "Logout"}
      </button>{" "}
      {createWorkerMutation.error && (
        <p className="text-red-600">
          Something went wrong! {createWorkerMutation.error.message}
        </p>
      )}
    </div>
  );
}
