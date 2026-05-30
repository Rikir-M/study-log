import { Form, Select } from "radix-ui";
import { createSession, updateSession } from "../../api/sessions";
import type { Session } from "../../types/session";
import { ChevronDown } from "lucide-react";

type SessionFormProps = {
    session?: Session;
    mode: "add" | "edit";
    onSuccess?: () => void;
};

export default function SessionForm({
    session,
    mode,
    onSuccess,
}: SessionFormProps) {
    const isEditMode = mode === "edit";

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;

        // Extract data from form
        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData);

        // Format data for Supabase (Converting strings to numbers)
        const sessionInput = {
            type: rawData.type as string,
            duration: Number(rawData.duration),
            score: rawData.score !== "" ? Number(rawData.score) : null, // Convert empty string to null for optional score
            note: (rawData.note as string) || null, // Convert empty string to null for optional note
        } as Session;

        // API call
        try {
            if (isEditMode && session) {
                await updateSession(session.id, sessionInput);
            } else {
                await createSession(sessionInput as Session);

                form.reset();
            }

            onSuccess?.();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Form.Root
            className="FormRoot flex flex-col gap-3"
            onSubmit={handleSubmit}
        >
            <Form.Field name="type">
                <div className="flex justify-between">
                    <Form.Label>Session Type</Form.Label>
                    {/* <Form.Message
                        match="valueMissing"
                        className="text-danger text-sm"
                    >
                        Please select a type
                    </Form.Message> */}
                </div>

                <Select.Root
                    name="type"
                    // required
                    defaultValue={session?.type ?? "SAT Math"}
                >
                    <Form.Control asChild>
                        <Select.Trigger className="border border-black rounded-lg p-2 w-full text-black flex justify-between items-center bg-background h-10 focus:outline-none data-[state=open]:outline data-[state=open]:outline-1 data-[state=open]:outline-black">
                            <Select.Value />
                            <Select.Icon>
                                <ChevronDown size={20} />
                            </Select.Icon>
                        </Select.Trigger>
                    </Form.Control>

                    <Select.Portal>
                        <Select.Content
                            position="popper"
                            sideOffset={4}
                            className="bg-background border border-black rounded-lg w-[var(--radix-select-trigger-width)] shadow-lg z-50 overflow-hidden"
                        >
                            <Select.Viewport className="p-1">
                                {[
                                    "SAT Math",
                                    "SAT Reading/Writing",
                                    "IELTS",
                                    "Italian",
                                    "Project",
                                ].map((type) => (
                                    <Select.Item
                                        key={type}
                                        value={type}
                                        className="p-2 text-black cursor-pointer rounded hover:bg-neutral-200 outline-none transition-colors data-[highlighted]:bg-neutral-200"
                                    >
                                        <Select.ItemText>
                                            {type}
                                        </Select.ItemText>
                                    </Select.Item>
                                ))}
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </Form.Field>
            <Form.Field name="duration">
                <div className="flex justify-between">
                    <Form.Label>Duration</Form.Label>
                    {/* <Form.Message
                        match="valueMissing"
                        className="text-danger text-sm"
                    >
                        Please select a duration
                    </Form.Message> */}
                </div>

                <Select.Root
                    name="duration"
                    required
                    defaultValue={String(session?.duration ?? 30)}
                >
                    <Form.Control asChild>
                        <Select.Trigger className="border border-black rounded-lg p-2 w-full text-black flex justify-between items-center bg-background h-10 focus:outline-none data-[state=open]:outline data-[state=open]:outline-1 data-[state=open]:outline-black">
                            <Select.Value />
                            <Select.Icon>
                                <ChevronDown size={20} />
                            </Select.Icon>
                        </Select.Trigger>
                    </Form.Control>

                    <Select.Portal>
                        <Select.Content
                            position="popper"
                            sideOffset={4}
                            className="bg-background border border-black rounded-lg w-[var(--radix-select-trigger-width)] shadow-lg z-50 overflow-hidden"
                        >
                            <Select.Viewport className="p-1">
                                {["30", "45", "60", "75", "90"].map(
                                    (duration) => (
                                        <Select.Item
                                            key={duration}
                                            value={duration}
                                            className="p-2 text-black cursor-pointer rounded hover:bg-neutral-200 outline-none transition-colors data-[highlighted]:bg-neutral-200"
                                        >
                                            <Select.ItemText>
                                                {duration} mins
                                            </Select.ItemText>
                                        </Select.Item>
                                    ),
                                )}
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </Form.Field>
            <Form.Field name="score">
                <div className="flex justify-between">
                    <Form.Label>Score</Form.Label>
                    <Form.Message
                        match="rangeUnderflow"
                        className="text-danger text-sm"
                    >
                        Minimum score is 1
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        name="score"
                        type="number"
                        min="1"
                        defaultValue={session?.score ?? ""}
                        className="border border-black rounded-lg p-2 w-full text-black bg-background  focus:outline-black focus:outline-2"
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="note">
                <div>
                    <Form.Label className="FormLabel">Note</Form.Label>
                </div>
                <Form.Control asChild>
                    <textarea
                        name="note"
                        defaultValue={session?.note ?? ""}
                        className="border border-black rounded-lg p-2 w-full text-black bg-background  focus:outline-black focus:outline-2"
                    />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button className="Button bg-primary py-3 rounded-full text-white">
                    {isEditMode ? "Update" : "Add"}
                </button>
            </Form.Submit>
        </Form.Root>
    );
}
