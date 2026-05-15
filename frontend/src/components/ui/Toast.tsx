import { useEffect, useState } from "react";

interface ToastMessage {
  id: number;
  text: string;
  type: "success" | "error" | "info";
}

let toastId = 0;

export function showToast(text: string, type: ToastMessage["type"] = "error") {
  window.dispatchEvent(new CustomEvent("sge:toast", { detail: { text, type } }));
}

export default function Toast() {
  const [msgs, setMsgs] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { text, type } = (e as CustomEvent).detail;
      const id = ++toastId;
      setMsgs((prev) => [...prev, { id, text, type }]);
      setTimeout(() => {
        setMsgs((prev) => prev.filter((m) => m.id !== id));
      }, 4000);
    };
    window.addEventListener("sge:toast", handler);
    return () => window.removeEventListener("sge:toast", handler);
  }, []);

  if (msgs.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {msgs.map((m) => (
        <div
          key={m.id}
          className={`px-4 py-2 rounded shadow-lg text-sm text-white ${
            m.type === "error"
              ? "bg-danger-600"
              : m.type === "success"
                ? "bg-success-600"
                : "bg-info-600"
          }`}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
}
