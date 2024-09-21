import CustomTabBar from "@/components/custom-tab-bar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sm:px-4 px-2 py-4">
      <CustomTabBar />
      {children}
    </div>
  );
}
