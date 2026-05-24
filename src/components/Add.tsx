import { Plus } from "lucide-react";
import { Dialog } from "radix-ui";
import FormTab from "./FormTab";

export default function Add() {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="absolute left-1/2 -translate-x-1/2 -top-[27px] w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center transition z-20">
                    <Plus size={35} />
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40" />

                <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-primary p-4 rounded-lg shadow-black shadow-md">
                    <FormTab />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
