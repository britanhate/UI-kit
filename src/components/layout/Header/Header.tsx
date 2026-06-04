import { getAuthState } from "@/lib/auth/session";

import { HeaderAuthAction } from "./HeaderAuthAction";
import { HeaderBrandButton } from "./HeaderBrandButton";
import { HeaderShell } from "./HeaderShell";
import styles from "./Header.module.css";

export async function Header() {
  const authState = await getAuthState("layout.header");
  const user = authState.authenticated ? authState.user : null;

  return (
    <HeaderShell>
      <nav className={styles.navRow} aria-label="Головна навігація">
        <HeaderBrandButton />

        <HeaderAuthAction user={user} />
      </nav>
    </HeaderShell>
  );
}