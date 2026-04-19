import { Plus, X } from "lucide-react";
import AddSessionForm from "./AddSessionForm";
import { Dialog, Separator } from "radix-ui";

export default function AddSession() {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="absolute left-1/2 -translate-x-1/2 -top-[27px] w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center transition z-20">
                    <Plus size={35} />
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-lg shadow-black shadow-md">
                    <Dialog.Title className="mb-4 text-lg font-semibold">
                        Add Session
                    </Dialog.Title>

                    <Separator.Root className="mb-4 bg-white h-[1px]" />

                    <Dialog.Close asChild className="absolute top-4 right-4">
                        <button>
                            <X />
                        </button>
                    </Dialog.Close>

                    <AddSessionForm />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
