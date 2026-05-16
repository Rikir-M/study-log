import { Form } from "radix-ui";
import { createSession, updateSession } from "../../api/sessions";
import type { Session } from "../../types/session";

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
                        defaultValue={session?.type ?? ""}
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
            <Form.Field name="duration">
                <div className="flex justify-between">
                    <Form.Label>Duration</Form.Label>
                    <Form.Message
                        match="valueMissing"
                        className="text-red-500 text-sm"
                    >
                        Please select a duration
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <select
                        name="duration"
                        required
                        defaultValue={
                            session?.duration ? String(session.duration) : ""
                        }
                        className="border rounded-lg p-2 w-full text-black"
                    >
                        <option value="">Select duration...</option>
                        <option value="30">30 min</option>
                        <option value="45">45 min</option>
                        <option value="60">60 min</option>
                        <option value="75">75 min</option>
                        <option value="90">90 min</option>
                    </select>
                </Form.Control>
            </Form.Field>
            <Form.Field name="score">
                <div className="flex justify-between">
                    <Form.Label>Score</Form.Label>
                    <Form.Message
                        match="rangeUnderflow"
                        className="text-red-500 text-sm"
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
                        className="border rounded-lg p-2 w-full text-black"
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
