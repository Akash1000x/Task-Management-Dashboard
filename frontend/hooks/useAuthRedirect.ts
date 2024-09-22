import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthRedirect = () => {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const isPublicPath = path === "/sign-in" || path === "/sign-up";

    if (!token && !isPublicPath) {
      router.push("/sign-in");
    }
  }, [path, router]);
};

export default useAuthRedirect;
