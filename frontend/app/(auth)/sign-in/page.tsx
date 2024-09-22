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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/state/authSlice";

const formSchema = z.object({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`${ApiUrl}/user/login`, values, { withCredentials: true });
      if (response.status === 200) {
        toast.success(response.data.message);
        const token = response.data.token;
        document.cookie = `token=${token}; path=/; secure; samesite=strict max-age=86400`;
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
      <h1 className="font-bold text-4xl pt-6 pb-4 text-center">Sign in</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            Submit
          </Button>
        </form>
      </Form>
      <div className="pt-4 pb-2 text-sm flex justify-center">
        <div>Don&apos;t have an account?</div>
        <Link className="pointer underline pl-1 cursor-pointer" href={"/sign-up"}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
