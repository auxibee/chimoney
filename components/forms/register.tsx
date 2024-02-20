"use client";
import { register } from "@/lib/actions/auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormState, useFormStatus } from "react-dom";
import FormError from "../input-error";

export default function Registerform() {
  const initialState = { message: "", errors: {} };
  const [state, action] = useFormState(register, initialState);
  return (
    <form
      action={action}
      className="flex flex-col p-2 space-y-2 max-w-md border border-gray-500"
    >
      <div className="text-center mb-3">
        <h1 className="font-bold text-2xl">Register</h1>
        <p className="text-sm text-gray-500">
          Register to start sending and recieving money
        </p>
      </div>

      {state?.message && (
        <p className="text-red-500 text-center">{state.message}</p>
      )}

      <Label>Email</Label>
      <Input type="email" placeholder="email" name="email" required />
      {state?.errors?.email && <FormError message={state.errors.email[0]} />}

      <Label>Password</Label>
      <Input type="password" placeholder="********" name="password" required />
      {state?.errors?.password && (
        <FormError message={state.errors.password[0]} />
      )}

      <Label>Repeat Password</Label>
      <Input
        type="password"
        placeholder="********"
        name="confirmPassword"
        required
      />
      {state?.errors?.confirmPassword && (
        <FormError message={state.errors.confirmPassword[0]} />
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const status = useFormStatus();
  return (
    <Button type="submit" disabled={status.pending}>
      {" "}
      {status.pending ? "Registering" : "Register"}{" "}
    </Button>
  );
}
