import { useLanguage } from "@/i18n/LanguageProvider";
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { t } = useLanguage();
  const { toasts } = useToast();

  return (
    <ToastProvider label={t("Notifications")}>
      {toasts.map(function({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport label={t("Notifications ({hotkey})")} />
    </ToastProvider>
  );
}
