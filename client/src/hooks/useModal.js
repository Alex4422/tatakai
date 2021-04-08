import { useState, useMemo, useContext, createContext } from "react";

const ModalContext = createContext();

const ModalProvider = (props) => {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  const value = useMemo(() => {
    return {
      visible,
      handleOpen,
      handleClose,
    };
  }, [handleClose, handleOpen, visible]);
  return (
    <ModalContext.Provider value={value}>
      {props.children}
    </ModalContext.Provider>
  );
};
export function useModal() {
  const value = useContext(ModalContext);
  return { ...value };
}
export default ModalProvider;
