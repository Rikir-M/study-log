import { X } from "lucide-react";
import SessionForm from "./SessionForm";
import { Dialog, Separator } from "radix-ui";
import type { Session } from "../types/session";

type EditSessionProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    session: Session | null;
};

export default function EditSession({
    open,
    onOpenChange,
    session,
}: EditSessionProps) {
    if (!session) return null;

    return (
        <Dialog.Root
            open={open}
            onOpenChange={onOpenChange}
        >
            <Dialog.Portal>
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-lg shadow-black shadow-md">
                    <Dialog.Title className="mb-4 text-lg font-semibold">
                        Edit Session
                    </Dialog.Title>

                    <Separator.Root className="mb-4 bg-white h-[1px]" />

                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4">
                            <X />
                        </button>
                    </Dialog.Close>

                    <SessionForm
                        mode="edit"
                        session={session}
                    />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}