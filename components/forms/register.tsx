import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Registerform() {
  return (
    <form className="flex flex-col p-2 space-y-2 max-w-md border border-gray-500">
      <div className="text-center mb-3">
        <h1 className="font-bold text-2xl">Register</h1>
        <p className="text-sm text-gray-500">
          Register to start sending and recieving money
        </p>
      </div>
      <Label>Email</Label>
      <Input type="email" placeholder="email" name="email" required />
      <Label>Password</Label>
      <Input type="password" placeholder="********" name="password" required />

      <Label>Repeat Password</Label>
      <Input
        type="password"
        placeholder="********"
        name="repeatpassword"
        required
      />
      <Button>Login </Button>
    </form>
  );
}
