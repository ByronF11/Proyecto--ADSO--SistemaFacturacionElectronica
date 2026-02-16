"use client";

import { usePathname } from "next/navigation";
import SubMenuUsuarios from "./usuarios/SubMenuUsuarios";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith("/usuarios") && <SubMenuUsuarios />}
      {children}
    </>
  );
}
