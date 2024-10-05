import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Redirect the user to the sign-in page if the user is not authenticated and trying to access the private routes
 */
const useAuthRedirect = () => {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const isPublicPath = path === "/sign-in" || path === "/sign-up";

    if (token && isPublicPath) {
      router.push("/board");
    }

    if (!token && !isPublicPath) {
      router.push("/sign-in");
    }
  }, [path, router]);
};

export default useAuthRedirect;
