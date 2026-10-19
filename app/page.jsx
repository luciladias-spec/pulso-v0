"use client";

import { useEffect } from "react";
import { HTML } from "./html";
import { iniciar } from "./logica";

export default function Page() {
  useEffect(() => { iniciar(); }, []);
  return <div dangerouslySetInnerHTML={{ __html: HTML }} />;
}
