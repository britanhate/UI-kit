import { AccentButton } from "@/components/ui/AccentButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import styles from "./ButtonDemo.module.css";

export function ButtonDemo() {
  return (
    <div className={styles.row}>
      <AccentButton href="#">Accent action</AccentButton>
      <Button type="button" variant="primary">
        Primary
      </Button>
      <Button type="button" variant="secondary">
        Secondary
      </Button>
      <Button type="button" variant="ghost">
        Ghost
      </Button>
      <Button type="button" variant="secondary" disabled>
        Disabled
      </Button>
      <Badge variant="accent">Badge</Badge>
    </div>
  );
}
