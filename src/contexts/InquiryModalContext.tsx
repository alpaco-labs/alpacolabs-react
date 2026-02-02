import { createContext, useContext, useState, ReactNode } from "react";
import InquiryFormModal from "@/components/InquiryFormModal";

interface InquiryModalContextType {
  openInquiryModal: (packageName?: string) => void;
  closeInquiryModal: () => void;
}

const InquiryModalContext = createContext<InquiryModalContextType | undefined>(undefined);

export const useInquiryModal = () => {
  const context = useContext(InquiryModalContext);
  if (!context) {
    throw new Error("useInquiryModal must be used within InquiryModalProvider");
  }
  return context;
};

interface InquiryModalProviderProps {
  children: ReactNode;
}

export const InquiryModalProvider = ({ children }: InquiryModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [packageName, setPackageName] = useState<string | undefined>();

  const openInquiryModal = (pkgName?: string) => {
    setPackageName(pkgName);
    setIsOpen(true);
  };

  const closeInquiryModal = () => {
    setIsOpen(false);
    setPackageName(undefined);
  };

  return (
    <InquiryModalContext.Provider value={{ openInquiryModal, closeInquiryModal }}>
      {children}
      <InquiryFormModal 
        isOpen={isOpen} 
        onClose={closeInquiryModal}
        packageName={packageName}
      />
    </InquiryModalContext.Provider>
  );
};
