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

/**
 * Form schema for the sign up form
 */
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character.",
    }),
});

export default function ProfileForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * Form hook to handle the sign up form
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
  async function onSubmit(values: z.infer<typeof formSchema>) {
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
                  <Input placeholder="your name" {...field} />
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
                  <Input placeholder="example@gmail.com" {...field} />
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
                  <Input placeholder="........" {...field} />
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
