import { Plus } from "lucide-react";
import AddSessionForm from "./AddSessionForm";
import { Dialog } from "radix-ui";

export default function AddSession() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="
                absolute left-1/2 -translate-x-1/2 -top-[27px]
                w-20 h-20 rounded-full bg-primary text-white
                flex items-center justify-center
                transition z-20
              "
        >
          <Plus size={35} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded">
          <Dialog.Title className="">Add Session</Dialog.Title>

          <AddSessionForm />

          <Dialog.Close asChild>
            <button>Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
