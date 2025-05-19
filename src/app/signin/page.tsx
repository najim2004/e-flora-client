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

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-green-100 shadow-md rounded-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-green-800 text-2xl">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-green-700">
            Sign in to your account to continue
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
              <Label htmlFor="email" className="text-green-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-green-700">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-green-600 hover:text-green-700"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-green-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-green-600">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-green-200 hover:bg-green-50"
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="border-green-200 hover:bg-green-50"
              >
                Facebook
              </Button>
            </div>
          </div>

          {/* <TabsContent value="register">
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
            </TabsContent> */}
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-green-700 text-center">
        By signing in, you agree to our{" "}
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
