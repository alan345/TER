import React from "react";
import { trpc } from "../utils/trpc";
import { AppContext } from "../ContextProvider";

type Props = {
  password: string;
  login: string;
  onCancel: () => void;
};
export function LoginMutation(props: Props) {
  const context = React.useContext(AppContext);
  const createWorkerMutation = trpc.login.useMutation({});
  const handleCreateWorker = () => {
    createWorkerMutation.mutate(
      { login: props.login, password: props.password },
      {
        onSuccess: () => context.updateUserId(),
      }
    );
  };
  return (
    <div>
      <button
        disabled={createWorkerMutation.isPending}
        onClick={handleCreateWorker}
        className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
      >
        {createWorkerMutation.isPending ? "Closing..." : "Login"}
      </button>{" "}
      <button onClick={props.onCancel}>Cancel</button>
      {createWorkerMutation.error && (
        <p className="text-red-600">
          Something went wrong! {createWorkerMutation.error.message}
        </p>
      )}
    </div>
  );
}
