import { trpc } from "../utils/trpc";
import { Button } from "@headlessui/react";

type Props = {
  onSuccess: () => void;
  id: string;
};
export function CloseWorker(props: Props) {
  const createWorkerMutation = trpc.closeWorker.useMutation({
    onSuccess: () => {
      props.onSuccess();
    },
  });
  const handleCreateWorker = () => {
    createWorkerMutation.mutate({ id: props.id });
  };
  return (
    <div>
      <Button
        disabled={createWorkerMutation.isPending}
        onClick={handleCreateWorker}
        className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
      >
        {createWorkerMutation.isPending ? "Closing..." : "Close"}
      </Button>{" "}
      {createWorkerMutation.error && (
        <p className="text-red-600">
          Something went wrong! {createWorkerMutation.error.message}
        </p>
      )}
    </div>
  );
}
