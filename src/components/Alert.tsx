import { AlertDialog } from "radix-ui";
import type { Session } from "../types/session";
import { deleteSession } from "../api/sessions";

type AlertProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    session: Session | null;
};

export default function Alert({
    open,
    onOpenChange,
    session,
}: AlertProps) {
    const handleDelete = async () => {
        if (!session) return;

        try {
            await deleteSession(session.id);

            onOpenChange(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AlertDialog.Root
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/40" />

                <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
                    <AlertDialog.Title className="text-lg font-semibold">
                        Delete Session?
                    </AlertDialog.Title>

                    <AlertDialog.Description className="mt-3 mb-5 text-sm text-gray-600">
                        This action cannot be undone.
                    </AlertDialog.Description>

                    <div className="flex justify-end gap-3">
                        <AlertDialog.Cancel asChild>
                            <button className="rounded border px-4 py-2">
                                Cancel
                            </button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action asChild>
                            <button
                                onClick={handleDelete}
                                className="rounded bg-red-500 px-4 py-2 text-white"
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