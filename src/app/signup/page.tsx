import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import NavLink from "@/components/ui/navlink";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-green-100 shadow-md rounded-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-green-800 text-2xl">
            Create a New Account
          </CardTitle>
          <CardDescription className="text-green-700">
            Sign up to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 mb-6 bg-gray-100 p-1 rounded-sm">
            <NavLink
              href="/signin"
              className="p-1.5 text-center text-gray-600 rounded-sm text-sm font-medium"
              activeClass="bg-green-600 text-white"
            >
              Sing In
            </NavLink>
            <NavLink
              href="/signup"
              className="p-1.5 text-center text-gray-600 rounded-sm text-sm font-medium"
              activeClass="bg-green-600 text-white"
            >
              Sign Up
            </NavLink>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-green-700">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email" className="text-green-700">
                Email
              </Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="Enter your email"
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-green-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-password" className="text-green-700">
                Password
              </Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="Create a password"
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-green-700">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-green-700 text-center">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-green-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-green-600 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
