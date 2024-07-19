import { useState } from "react";
import { trpc } from "../utils/trpc";
import { Button } from "@headlessui/react";
import { Input } from "@headlessui/react";
import { Worker } from "./User.type";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: (data: Worker) => void;
};
export function CreateWorker(props: Props) {
  const createWorkerMutation = trpc.createWorker.useMutation();
  const [phone, setPhone] = useState("+17075988753");
  const [email, setEmail] = useState("john.doe+123@gmail.com");
  const handleCreateWorker = () => {
    createWorkerMutation.mutate(
      { phone, email },
      {
        onSuccess: (data) => props.onSuccess(data),
      }
    );
  };
  return (
    <div>
      <div>
        <Input
          type="text"
          placeholder="Phone number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 border data-[hover]:shadow data-[focus]:bg-blue-100"
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 border data-[hover]:shadow data-[focus]:bg-blue-100"
        />
      </div>
      <div className="mt-2">
        <Button
          disabled={createWorkerMutation.isPending}
          onClick={handleCreateWorker}
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
        >
          {createWorkerMutation.isPending
            ? "Creating..."
            : "Create a new worker"}
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
