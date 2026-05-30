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
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-30" />

                <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 bg-background p-4 rounded-2xl shadow-black shadow-md z-30">
                    <FormTab />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
