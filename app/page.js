import BootScreen from "@/components/BootScreen";
import Desktop from "@/components/Desktop";
import BIOSWrapper from "@/components/BIOSWrapper";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black text-white relative">
      <BIOSWrapper />
      <BootScreen />
      <Desktop />
    </main>
  );
}
