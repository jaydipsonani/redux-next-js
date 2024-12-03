import { useRouter } from 'next/router';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface SidebarContextType {
  open: boolean;
  content: ReactNode;
  openSidebar: (content: ReactNode) => void;
  closeSidebar: () => void;
  isNotOutSideClickClose: boolean;
  setIsNotOutSideClickClose: any;
  requiredData: any;
  setReuiredData: any;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [isNotOutSideClickClose, setIsNotOutSideClickClose] = useState(false);
  const [requiredData, setReuiredData] = useState({ transaction_id: null });
  const route = useRouter();

  const openSidebar = (newContent: ReactNode) => {
    setContent(newContent);
    // addClassToDocumentElement("no-scroll");
    setOpen(true);
  };

  const closeSidebar = async () => {
    setOpen(false);
    // removeClassToDocumentElement("no-scroll");
    setContent(null);

    // if (isNotOutSideClickClose) {
    //   const fetchInquiryListApiRes = await handleOnDropDownAPi({
    //     method: "POST",
    //     body: {
    //       interaction_type: 1,
    //       transaction_id: requiredData?.transaction_id,
    //     },
    //   });

    //   setIsNotOutSideClickClose(false);
    // }
  };

  useEffect(() => {
    closeSidebar();
  }, [route]);

  return (
    <SidebarContext.Provider
      value={{
        open,
        content,
        openSidebar,
        closeSidebar,
        isNotOutSideClickClose,
        setIsNotOutSideClickClose,
        requiredData,
        setReuiredData,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
