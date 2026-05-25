import { X } from "lucide-react";
import { Dialog, Separator } from "radix-ui";
import type { ActionTarget } from "../pages/Sessions";
import SessionForm from "./sessions/SessionForm";
import MistakeForm from "./mistakes/MistakeForm";

type EditProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: ActionTarget | null;
};

export default function Edit({
    open,
    onOpenChange,
    item,
}: EditProps) {
    if (!item) return null;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-lg shadow-black shadow-md">
                    <Dialog.Title className="mb-4 text-lg font-semibold">
                        Edit {" "}
                        {item?.type === "mistake" ? "Mistake" : "Session"}
                    </Dialog.Title>

                    <Separator.Root className="mb-4 bg-white h-[1px]" />

                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4">
                            <X />
                        </button>
                    </Dialog.Close>

                    {item.type === "session" && (
                        <SessionForm mode="edit" session={item.data} />
                    )}
                    {item.type === "mistake" && (
                        <MistakeForm mode="edit" mistake={item.data} />
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
