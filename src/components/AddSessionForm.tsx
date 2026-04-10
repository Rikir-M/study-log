import { Form } from "radix-ui";

export default function AddSessionForm() {
  return (
    <Form.Root className="FormRoot flex flex-col">
      <Form.Field className="FormField" name="email">
        <div>
          <Form.Label className="FormLabel text-red-500">Email</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="email" required />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="question">
        <div>
          <Form.Label className="FormLabel">Question</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a question
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea className="Textarea" required />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="Button">Post question</button>
      </Form.Submit>
    </Form.Root>
  );
}
