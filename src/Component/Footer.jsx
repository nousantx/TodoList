import React from "react";
import { useStyler } from "./Styler";

export default function Footer() {
  useStyler();
  return (
    <footer>
      <p className="fs-12px">&copy; 2024 NOuSantx. Built with TenoxUI</p>
    </footer>
  );
}
