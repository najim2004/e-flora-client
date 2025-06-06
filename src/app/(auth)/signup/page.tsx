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
import { useSignupMutation } from "@/redux/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import { errorToast } from "@/components/customToast";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(11, "Phone number must be at least 11 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [signUpMutation, { isLoading }] = useSignupMutation();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (isLoading) return;
    try {
      const res = await signUpMutation(values).unwrap();
      if (res?.success) {
        console.log("User created successfully:", res);
        router.push("/signin");
      } else {
        errorToast(
          res.message || "Something went wrong please try again letter"
        );
      }
    } catch (error: any) {
      console.log("Error:", error);
      errorToast(
        error?.data?.error?.message || "Something went wrong please try again"
      );
    }
  }

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
              Sign In
            </NavLink>
            <NavLink
              href="/signup"
              className="p-1.5 text-center text-gray-600 rounded-sm text-sm font-medium"
              activeClass="bg-green-600 text-white"
            >
              Sign Up
            </NavLink>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-green-700">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-green-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-green-700">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-green-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-green-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Create Account
              </Button>
            </form>
          </Form>
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
