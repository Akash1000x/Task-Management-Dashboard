"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { ApiUrl } from "@/lib/config";
import { useDispatch } from "react-redux";
import { login } from "@/state/authSlice";
import { useRouter } from "next/navigation";
import { SignUpformSchema } from "@/lib/schema";

export default function ProfileForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * Form hook to handle the sign up form
   */
  const form = useForm<z.infer<typeof SignUpformSchema>>({
    resolver: zodResolver(SignUpformSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  /**
   * Handle the form submission and send the form data to the server to sign up the user
   *
   * @param values form values to submit
   */
  async function onSubmit(values: z.infer<typeof SignUpformSchema>) {
    try {
      /**
       * Send the form data to the server to sign up the user
       */
      const response = await axios.post(`${ApiUrl}/user/register`, values);
      /**
       * If the response status is 200, sign up the user, save the token in the local storage and redirect the user to the board page
       * otherwise show an error message
       */
      if (response.status === 201) {
        toast.success(response.data.message);
        const token = response.data.token;
        localStorage.setItem("token", token);
        dispatch(login({ name: response.data.user.name }));
        router.push("/board");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  }

  return (
    <div className="min-w-96 px-6 border rounded-lg">
      <h1 className="font-bold text-4xl pt-6 pb-4 text-center">Sign up</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@gmail.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </Form>
      <div className="pt-4 pb-2 text-sm flex justify-center">
        <div>Already have an account?</div>
        <Link className="pointer underline pl-1 cursor-pointer" href={"/sign-in"}>
          Sign in
        </Link>
      </div>
    </div>
  );
}
