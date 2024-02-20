import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Loginform() {
  return (
    <form className="flex flex-col p-2 space-y-2 max-w-md border border-gray-500">
      <div className="text-center mb-3">
        <h1 className="font-bold text-2xl">Login</h1>
        <p className="text-sm text-gray-500">Login to access your account</p>
      </div>
      <Label>Email</Label>
      <Input type="email" placeholder="email" required />
      <Label>Password</Label>
      <Input type="password" placeholder="********" required />
      <Button>Login </Button>
    </form>
  );
}
