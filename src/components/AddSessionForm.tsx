import { Form } from "radix-ui";
import { createSession } from "../api/sessions";
import type { Session } from "../types/session";

export default function AddSessionForm() {
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
            score: Number(rawData.score),
            note: rawData.note as string,
        } as Session;

        // API call
        await createSession(sessionInput);

        form.reset();
    };
    return (
        <Form.Root className="FormRoot flex flex-col" onSubmit={handleSubmit}>
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
                    <select required className="border p-2 w-full">
                        <option value="">Select a type...</option>
                        <option value="sat_math">SAT Math</option>
                        <option value="sat_rw">SAT Reading/Writing</option>
                        <option value="ielts">IELTS</option>
                        <option value="project">Project</option>
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
                    <select required className="border p-2 w-full">
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
                        type="number"
                        min="1"
                        className="border p-2 w-full"
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="note">
                <div>
                    <Form.Label className="FormLabel">Note</Form.Label>
                </div>
                <Form.Control asChild>
                    <textarea className="Textarea border p-2 w-full" />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button className="Button">Add</button>
            </Form.Submit>
        </Form.Root>
    );
}
