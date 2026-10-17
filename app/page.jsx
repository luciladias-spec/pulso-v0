"use client";

import { useEffect } from "react";
import { HTML, SCRIPT } from "./conteudo";

export default function Page() {
  useEffect(() => {
    // A lógica da calculadora e do diagnóstico roda igual à da página estática:
    // injetada como script real, depois que o HTML já está no DOM.
    const el = document.createElement("script");
    el.textContent = SCRIPT;
    document.body.appendChild(el);
    return () => {
      el.remove();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: HTML }} />;
}
