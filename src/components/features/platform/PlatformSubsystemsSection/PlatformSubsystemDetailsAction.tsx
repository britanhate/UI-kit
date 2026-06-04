"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";
import type { SubsystemConfig } from "@/config/subsystems";

import { PlatformSubsystemModal } from "./PlatformSubsystemModal";

type PlatformSubsystemDetailsActionProps = {
  subsystem: SubsystemConfig;
};

export function PlatformSubsystemDetailsAction({
  subsystem,
}: PlatformSubsystemDetailsActionProps) {
  const pathname = usePathname();

  return (
    <PlatformSubsystemDetailsActionContent
      key={`${pathname ?? "unknown"}:${subsystem.slug}`}
      subsystem={subsystem}
    />
  );
}

function PlatformSubsystemDetailsActionContent({
  subsystem,
}: PlatformSubsystemDetailsActionProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const closeDetails = useCallback(() => setIsDetailsOpen(false), []);

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setIsDetailsOpen(true)}
      >
        Детальніше
      </Button>

      {isDetailsOpen ? (
        <PlatformSubsystemModal subsystem={subsystem} onClose={closeDetails} />
      ) : null}
    </>
  );
}
