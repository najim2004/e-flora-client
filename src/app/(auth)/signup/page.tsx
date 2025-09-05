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
import { useRouter, useSearchParams } from "next/navigation";
import { errorToast } from "@/components/common/CustomToast";

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
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (isLoading) return;
    try {
      const { name, email, password } = values; // Extract only the required fields
      const res = await signUpMutation({ name, email, password }).unwrap(); // Pass only the required fields
      if (res?.success) {
        console.log("User created successfully:", res);
        router.replace("/signin" + (redirect ? `?redirect=${redirect}` : "/"));
      } else {
        errorToast(
          res.message || "Something went wrong please try again letter"
        );
      }
    } catch (error) {
      console.log("Error:", error);
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
          <CardTitle className="text-primary text-2xl">
            Create a New Account
          </CardTitle>
          <CardDescription className="text-primary/80">
            Sign up to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 mb-6 bg-gray-100 p-1 rounded-sm">
            <NavLink
              href={`/signin${redirect ? `?redirect=${redirect}` : ""}`}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-primary/80">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="border-border focus:border-primary/80 focus:ring-primary/80"
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
                    <FormLabel className="!text-primary/80">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="border-border focus:border-primary/80 focus:ring-primary/80"
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
                    <FormLabel className="!text-primary/80">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        className="border-border focus:border-primary/80 focus:ring-primary/80"
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
                    <FormLabel className="!text-primary/80">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        className="border-border focus:border-primary/80 focus:ring-primary/80"
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
                    <FormLabel className="!text-primary/80">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        className="border-border focus:border-primary/80 focus:ring-primary/80"
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
                className="w-full bg-primary hover:bg-primary/80"
              >
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-primary/80 text-center">
        By signing up, you agree to our{" "}
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
