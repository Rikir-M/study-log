import { X } from "lucide-react";
import { Dialog, Separator } from "radix-ui";
import type { ActionTarget } from "../pages/Sessions";
import SessionForm from "./sessions/SessionForm";
import MistakeForm from "./mistakes/MistakeForm";
import IconBtn from "./IconBtn";

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
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-30" />

                <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 bg-background p-4 rounded-lg shadow-black shadow-md z-30">
                    <Dialog.Title className="mb-4 text-lg font-semibold font-shantell">
                        Edit {" "}
                        {item?.type === "mistake" ? "Mistake" : "Session"}
                    </Dialog.Title>

                    <Separator.Root className="mb-4 bg-black h-[1px]" />

                    <Dialog.Close asChild>
                        <IconBtn icon={X} className="absolute top-5 right-4" />
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
