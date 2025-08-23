"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import NavLink from "@/components/ui/navlink";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useLoginMutation } from "@/redux/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import { errorToast } from "@/components/customToast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const [loginMutation] = useLoginMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await loginMutation({
        email: values.email,
        password: values.password,
      }).unwrap();
      console.log(res);
      if (res?.success) {
        router.replace("/");
      } else {
        errorToast(
          res?.message || "Something went wrong please try again letter"
        );
      }
    } catch (error) {
      console.log(error);

      const errMsg =
        (error as { data?: { error?: { message?: string } } })?.data?.error
          ?.message || "Something went wrong please try again later";

      errorToast(errMsg);
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-border shadow-md rounded-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-primary text-2xl">Welcome Back</CardTitle>
          <CardDescription className="text-primary/80">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 mb-6 bg-gray-100 p-1 rounded-sm">
            <NavLink
              href="/signin"
              className="p-1.5 text-center text-gray-600 rounded-sm text-sm font-medium"
              activeClass="bg-primary text-white"
            >
              Sign In
            </NavLink>
            <NavLink
              href="/signup"
              className="p-1.5 text-center text-gray-600 rounded-sm text-sm font-medium"
              activeClass="bg-primary text-white"
            >
              Sign Up
            </NavLink>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-primary/80">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="border-border focus:border-primary/80 focus:ring-primary/80"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="!text-primary/80">
                        Password
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-primary hover:text-primary/80"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="border-border focus:border-primary/80 focus:ring-primary/80"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80"
              >
                Sign In
              </Button>
            </form>
          </Form>

          {/* ...existing code... */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-primary">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-border hover:bg-green-50"
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-green-50"
              >
                Facebook
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-primary/80 text-center">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
