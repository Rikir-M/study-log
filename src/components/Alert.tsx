import { AlertDialog } from "radix-ui";
import { deleteSession } from "../api/sessions";
import { deleteMistake } from "../api/mistakes";
import type { ActionTarget } from "../pages/Sessions";

type AlertProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: ActionTarget | null;
};

export default function Alert({ open, onOpenChange, item }: AlertProps) {
    const handleDelete = async () => {
        if (!item) return;

        try {
            if (item.type === "session") {
                await deleteSession(item.data.id);
            }

            if (item.type === "mistake") {
                await deleteMistake(item.data.id);
            }

            onOpenChange(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-30" />

                <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-background p-6 shadow-lg z-30">
                    <AlertDialog.Title className="text-lg text-center font-semibold font-shantell">
                        Delete{" "}
                        {item?.type === "mistake" ? "Mistake" : "Session"}?
                    </AlertDialog.Title>

                    <AlertDialog.Description className="mt-3 mb-5 text-center">
                        You sure you wanna delete it? No recovery.
                    </AlertDialog.Description>

                    <div className="w-full flex justify-between">
                        <AlertDialog.Cancel asChild>
                            <button className="w-[48%] rounded-full border border-primary px-4 py-2">
                                Cancel
                            </button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action asChild>
                            <button
                                onClick={handleDelete}
                                className="w-[48%] rounded-full bg-danger px-4 py-2 text-white"
                            >
                                Delete
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
