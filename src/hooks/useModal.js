import React, { useCallback, useContext, useState } from "react";



import LoginModal from "../modals/LoginModal";
import RegModal from "../modals/Reg/RegModal";
import ConfirmModal from "../modals/ComfirmModal";
import Page404 from "../screens/404/404";

const ModalContext = React.createContext();
ModalContext.displayName = "ModalContext";

export const MODALS = {
  'NONE': 'NONE',
  'CONFIRM': 'CONFIRM',
  'LOGIN': 'LOGIN',
  'REG': 'REG',
  'ERROR': 'ERROR'
};

export function Modals() {
  return (
    <ModalContext.Consumer>
      {(context) => {
        const onClose = () => context.showModal(MODALS.NONE);
        switch (context.currentModal) {
          case MODALS.LOGIN:
            return <LoginModal onClose={onClose} {...context.modalProps} />;
          case MODALS.REG:
            return <RegModal onClose={onClose} {...context.modalProps} />;
          case MODALS.CONFIRM:
            return <ConfirmModal onClose={onClose} {...context.modalProps} />;
          case MODALS.ERROR:
            return <Page404 onClose={onClose} {...context.modalProps} />;
          case MODALS.NONE:
          default:
            return null;
        }
      }}
    </ModalContext.Consumer>
  );
}

export function ModalContextProvider({ children }) {
  const [currentModal, setCurrentModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const showModal = useCallback(
    (newModal, newModalProps = {}) => {
      setModalProps(newModalProps);
      setCurrentModal(newModal);
    },
    [setCurrentModal, setModalProps]
  );
  return (
    <ModalContext.Provider value={{ currentModal, showModal, modalProps }}>
      {children}
      <Modals />
    </ModalContext.Provider>
  );
}

export function useModals() {
  return useContext(ModalContext);
}
