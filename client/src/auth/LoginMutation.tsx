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
        id="login-mutation-button"
        disabled={createWorkerMutation.isPending}
        onClick={handleCreateWorker}
        className="btn btn-blue"
      >
        {createWorkerMutation.isPending ? "Closing..." : "Login"}
      </button>{" "}
      <button id="cancel-mutation-button" onClick={props.onCancel}>
        Cancel
      </button>
      {createWorkerMutation.error && (
        <p className="text-red-600">{createWorkerMutation.error.message}</p>
      )}
    </div>
  );
}
