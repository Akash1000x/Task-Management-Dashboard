"use client";
import { store } from "@/state/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Provider store={store}>
        {children}
        <Toaster />
      </Provider>
    </ThemeProvider>
  );
};

export default Providers;
