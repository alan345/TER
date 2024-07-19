import { useState } from "react";
import { trpc } from "../utils/trpc";
import { Button } from "@headlessui/react";
import { Input } from "@headlessui/react";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
  workerId: string;
};
export function PayWorker(props: Props) {
  const createWorkerMutation = trpc.payWorker.useMutation({
    onSuccess: () => {
      props.onSuccess();
    },
  });
  const [amount, setAmount] = useState("");

  const handlePayWorker = () => {
    createWorkerMutation.mutate({
      amount: Number(amount),
      workerId: props.workerId,
    });
  };
  return (
    <div>
      <div>
        <div>
          <span>$</span>
          <Input
            type="number"
            placeholder="Amount"
            name="phone"
            invalid={Number(amount) < 0 ? true : false}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 border data-[hover]:shadow data-[focus]:bg-blue-100 invalid:bg-red-900"
          />
          {/* {amount < } */}
        </div>
      </div>
      <div className="mt-2">
        <Button
          disabled={createWorkerMutation.isPending}
          onClick={handlePayWorker}
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
        >
          {createWorkerMutation.isPending ? "Creating..." : "Pay"}
        </Button>{" "}
        <button onClick={() => props.setIsOpen(false)}>Cancel</button>
        {createWorkerMutation.error && (
          <p className="text-red-600">
            Something went wrong! {createWorkerMutation.error.message}
          </p>
        )}
      </div>
    </div>
  );
}
