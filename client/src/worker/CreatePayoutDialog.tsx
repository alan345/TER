import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { Button } from "@headlessui/react";
import { CreateWorker } from "./CreateWorker";
import { PayWorker } from "./PayWorker";

type Props = {
  onSuccess: () => void;
  workerId: string;
};
export function CreatePayoutDialog(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded bg-sky-600 py-2 px-4 text-white hover:bg-sky-500 active:bg-sky-700"
      >
        Pay Worker
      </Button>
      {message && (
        <div className="text-green-600">
          <p>{message}</p>
        </div>
      )}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Pay Worker</DialogTitle>
            <Description>
              This endpoint is used to onboard a new worker to Checkr Pay.
              https://docs.checkrpay.com/#operation/post-worker
            </Description>

            <div className="flex gap-4">
              <PayWorker
                workerId={props.workerId}
                setIsOpen={setIsOpen}
                onSuccess={() => {
                  setIsOpen(false);
                  setMessage("Payment created successfully!");
                  props.onSuccess();
                }}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
