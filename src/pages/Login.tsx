import { Form } from "radix-ui";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../utils/supabase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    navigate("/");
  }

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="bg-primary rounded-xl p-5">
        <Form.Root className="w-[260px]" onSubmit={handleLogin}>
          <Form.Field className="mb-2.5 grid" name="email">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                Email
              </Form.Label>

              <Form.Message
                className="text-[13px] text-red-500 opacity-80"
                match="valueMissing"
              >
                Please enter your email
              </Form.Message>

              <Form.Message
                className="text-[13px] text-red-500 opacity-80"
                match="typeMismatch"
              >
                Please provide a valid email
              </Form.Message>
            </div>

            <Form.Control asChild>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[35px] w-full rounded px-2.5 outline-none"
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="mb-2.5 grid" name="password">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                Password
              </Form.Label>

              <Form.Message
                className="text-[13px] text-red-500 opacity-80"
                match="valueMissing"
              >
                Please enter a password
              </Form.Message>
            </div>

            <Form.Control asChild>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[35px] w-full rounded px-2.5 outline-none"
              />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button className="mt-2.5 h-[35px] w-full rounded bg-white font-medium">
              Login
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
};

export default Login;