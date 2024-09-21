"use client";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/state/authSlice";
import { RootState } from "@/state/store";
import axios from "axios";
import { ApiUrl } from "@/lib/config";
import { useRouter } from "next/navigation";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import React from "react";

export default function NavBar() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { getCurrentUser } = useGetCurrentUser();
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${ApiUrl}/user/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        dispatch(logout());
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (!user.isAuthenticated) {
      getCurrentUser();
    }
  }, [user, getCurrentUser]);

  return (
    <div className="shadow-lg dark:shadow-[0px_4px_30px_0px_rgba(255,255,255,0.125)] sm:px-10 px-2 py-2">
      <nav className="flex justify-between items-center">
        <div className="sm:space-x-10 space-x-2">
          <Link href="/board">Board</Link>
          <Link href="/task-list">Task List</Link>
        </div>

        <div className="flex flex-1 justify-end text-white">
          <>
            {user.isAuthenticated && (
              <>
                <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full border bg-secondary text-xl font-bold uppercase text-secondary-foreground hover:bg-secondary/80">
                  {user.name?.charAt(0)}
                </div>

                <Button onClick={handleLogout}>Log out</Button>
              </>
            )}
          </>
        </div>
        <div className="sm:pl-4 pl-1">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
