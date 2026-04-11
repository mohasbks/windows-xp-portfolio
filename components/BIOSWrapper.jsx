"use client";
import BIOS from "./BIOS";
import PowerButton from "./PowerButton";
import useOSStore from "@/store/useOSStore";

export default function BIOSWrapper() {
  const biosComplete = useOSStore(state => state.biosComplete);
  const powerOn = useOSStore(state => state.powerOn);

  if (biosComplete) return null;

  return (
    <>
      {!powerOn && <PowerButton />}
      {powerOn && <BIOS />}
    </>
  );
}
