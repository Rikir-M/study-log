import { Form, Select } from "radix-ui";
import type { Mistake } from "../../types/mistake";
import { createMistake, updateMistake } from "../../api/mistakes";
import { ChevronDown } from "lucide-react";

type MistakeFormProps = {
    mistake?: Mistake;
    mode: "add" | "edit";
    onSuccess?: () => void;
};

export default function MistakeForm({
    mistake,
    mode,
    onSuccess,
}: MistakeFormProps) {
    const isEditMode = mode === "edit";

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;

        // Extract data from form
        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData);

        // Format data for Supabase (Converting strings to numbers)
        const mistakeInput = {
            topic: rawData.topic as string,
            type: rawData.type as string,
            note: (rawData.note as string) || null, // Convert empty string to null for optional note
        } as Mistake;

        // API call
        try {
            if (isEditMode && mistake) {
                await updateMistake(mistake.id, mistakeInput);
            } else {
                await createMistake(mistakeInput as Mistake);

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
            <Form.Field name="topic">
                <div className="flex justify-between">
                    <Form.Label>Topic</Form.Label>
                    <Form.Message
                        match="valueMissing"
                        className="text-danger text-sm"
                    >
                        Please enter a topic
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <textarea
                        name="topic"
                        required
                        defaultValue={mistake?.topic ?? ""}
                        className="border border-black rounded-lg p-2 w-full text-black bg-background focus:outline-black focus:outline-2"
                    />
                </Form.Control>
            </Form.Field>
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
                    defaultValue={mistake?.type ?? "SAT Math"}
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
            <Form.Field className="FormField" name="note">
                <div>
                    <Form.Label className="FormLabel">Note</Form.Label>
                </div>
                <Form.Control asChild>
                    <textarea
                        name="note"
                        defaultValue={mistake?.note ?? ""}
                        className="border border-black rounded-lg p-2 w-full text-black bg-background focus:outline-black focus:outline-2"
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
