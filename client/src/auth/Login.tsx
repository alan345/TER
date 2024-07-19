import React from "react";
import { trpc } from "../utils/trpc";
import { Button } from "@headlessui/react";
import { AppContext } from "../ContextProvider";

export function Login() {
  const context = React.useContext(AppContext);
  const createWorkerMutation = trpc.login.useMutation({});
  const handleCreateWorker = () => {
    createWorkerMutation.mutate(
      { login: "", password: "" },
      {
        onSuccess: () => context.updateUserId(),
      }
    );
  };
  return (
    <div>
      <Button
        disabled={createWorkerMutation.isPending}
        onClick={handleCreateWorker}
        className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
      >
        {createWorkerMutation.isPending ? "Closing..." : "Login"}
      </Button>{" "}
      {createWorkerMutation.error && (
        <p className="text-red-600">
          Something went wrong! {createWorkerMutation.error.message}
        </p>
      )}
    </div>
  );
}
