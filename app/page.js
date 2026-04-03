import BootScreen from "@/components/BootScreen";
import Desktop from "@/components/Desktop";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black text-white relative">
      <BootScreen />
      <Desktop />
    </main>
  );
}
