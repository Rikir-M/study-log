import { Form } from "radix-ui";
import type { Mistake } from "../../types/mistake";
import { createMistake, updateMistake } from "../../api/mistakes";

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
                        className="text-red-500 text-sm"
                    >
                        Please enter a topic
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <textarea
                        name="topic"
                        required
                        defaultValue={mistake?.topic ?? ""}
                        className="border rounded-lg p-2 w-full text-black"
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field name="type">
                <div className="flex justify-between">
                    <Form.Label>Session Type</Form.Label>
                    <Form.Message
                        match="valueMissing"
                        className="text-red-500 text-sm"
                    >
                        Please select a type
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <select
                        name="type"
                        required
                        defaultValue={mistake?.type ?? ""}
                        className="border rounded-lg p-2 w-full text-black"
                    >
                        <option value="">Select a type...</option>
                        <option value="SAT Math">SAT Math</option>
                        <option value="SAT Reading/Writing">
                            SAT Reading/Writing
                        </option>
                        <option value="IELTS">IELTS</option>
                        <option value="Project">Project</option>
                    </select>
                </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="note">
                <div>
                    <Form.Label className="FormLabel">Note</Form.Label>
                </div>
                <Form.Control asChild>
                    <textarea
                        name="note"
                        defaultValue={mistake?.note ?? ""}
                        className="border rounded-lg p-2 w-full text-black"
                    />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button className="Button bg-primary py-3 rounded-lg text-white">
                    {isEditMode ? "Update" : "Add"}
                </button>
            </Form.Submit>
        </Form.Root>
    );
}
