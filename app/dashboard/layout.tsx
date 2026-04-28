import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex-row md:overflow-hidden flex h-screen flex-col">
      <div className="md:w-64 w-full flex-none">
        <SideNav />
      </div>
      <div className="p-6 md:overflow-y-auto md:p-12 grow">{children}</div>
    </div>
  );
}
