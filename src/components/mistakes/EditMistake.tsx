import { X } from "lucide-react";
import { Dialog, Separator } from "radix-ui";
import type { Mistake } from "../../types/mistake";
import MistakeForm from "./MistakeForm";

type EditMistakeProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mistake: Mistake | null;
};

export default function EditMistake({
    open,
    onOpenChange,
    mistake,
}: EditMistakeProps) {
    if (!mistake) return null;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-lg shadow-black shadow-md">
                    <Dialog.Title className="mb-4 text-lg font-semibold">
                        Edit Mistake
                    </Dialog.Title>

                    <Separator.Root className="mb-4 bg-white h-[1px]" />

                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4">
                            <X />
                        </button>
                    </Dialog.Close>

                    <MistakeForm mode="edit" mistake={mistake} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
