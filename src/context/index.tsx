import {
  Toast,
  ToastIntent,
  ToastTitle,
  Toaster,
  useId,
  useToastController,
} from "@fluentui/react-components";
import { createContext, useCallback, useMemo } from "react";

export interface IWebContext {
  notify: (msg: string, intent: ToastIntent) => void;
}
export const WebContext = createContext<IWebContext>({} as IWebContext);

const WebContextProvider: React.FC<{
  notify: (msg: string, intent: ToastIntent) => void;
  children?: React.ReactNode;
}> = ({ notify, children }) => {
  const value = useMemo(
    () => ({
      notify,
    }),
    [notify]
  );
  return <WebContext.Provider value={value}>{children}</WebContext.Provider>;
};

export const Context: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const notify = useCallback(
    (msg: string, intent: ToastIntent) => {
      dispatchToast(
        <Toast>
          <ToastTitle>{msg}</ToastTitle>
        </Toast>,
        { intent }
      );
    },
    [dispatchToast]
  );

  return (
    <section>
      <Toaster position="top-end" toasterId={toasterId} timeout={2000} />
      <WebContextProvider notify={notify}>{children}</WebContextProvider>
    </section>
  );
};

export default Context;
