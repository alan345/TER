import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { Button } from "@headlessui/react";
import { CreateWorker } from "./CreateWorker";

type Props = {
  onSuccess: () => void;
};
export function CreateWorkerDialog(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded bg-sky-600 py-2 px-4 text-white hover:bg-sky-500 active:bg-sky-700"
      >
        Create Worker
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
            <DialogTitle className="font-bold">Create a new worker</DialogTitle>
            <Description>
              This endpoint is used to onboard a new worker to Checkr Pay.
              https://docs.checkrpay.com/#operation/post-worker
            </Description>

            <div className="flex gap-4">
              <CreateWorker
                setIsOpen={setIsOpen}
                onSuccess={(worker) => {
                  setIsOpen(false);
                  setMessage(
                    `Worker with id ${worker.id} and email ${worker.profile.email}  has been created successfully! Go to the last page to see the new worker.`
                  );
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
