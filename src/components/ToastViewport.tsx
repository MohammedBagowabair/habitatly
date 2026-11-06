import { X } from "lucide-react";
import { useProject } from "../context/ProjectContext";

export function ToastViewport() {
  const { toasts, dismissToast } = useProject();
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed right-4 bottom-4 left-4 z-[60] flex flex-col gap-2 sm:left-auto sm:w-96" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-2xl bg-forest px-4 py-3 text-sm text-paper shadow-[0_16px_40px_-24px_rgba(36,76,59,0.8)]"
        >
          <p className="flex-1 leading-5">{toast.message}</p>
          <button
            type="button"
            className="rounded-full p-1 text-lime"
            aria-label="Dismiss notification"
            onClick={() => dismissToast(toast.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
