import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <div className="w-full max-w-md p-6 bg-white rounded-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Sign In
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email or username"
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-[#2E7D32] focus:ring-[#2E7D32]"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <Button
              id="forgot-password"
              variant="link"
              className="text-sm text-[#2E7D32] hover:text-[#1B5E20]"
            >
              Forgot password?
            </Button>
          </div>
          <Button
            id="sign-in-submit"
            type="submit"
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white !rounded-button whitespace-nowrap"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: faGoogle, label: "Google" },
              { icon: faFacebookF, label: "Facebook" },
              { icon: faTwitter, label: "Twitter" },
            ].map((social, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex items-center justify-center w-full px-4 py-2 space-x-2 border hover:bg-gray-50 !rounded-button whitespace-nowrap"
              >
                <FontAwesomeIcon icon={social.icon} className="w-4 h-4" />
                <span className="sr-only">{social.label}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            Don&#39;t have an account?{" "}
          </span>
          <Link
            href={"/signup"}
            className="text-sm text-[#2E7D32] hover:text-[#1B5E20]"
          >
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
