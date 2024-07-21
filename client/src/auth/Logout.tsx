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
        id="logout-button"
        disabled={createWorkerMutation.isPending}
        onClick={handleCreateWorker}
        className="btn btn-blue"
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
