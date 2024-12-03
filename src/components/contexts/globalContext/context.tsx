import GlobalLoader from '@/components/modules/globalLoader';
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

type GlobalContextType = {
  cityData: any;
  setCityData: (cityData: any) => void;
  commonDetails: any;
  setCommonDetails: (cityData: any) => void;
  getpopularData: () => void;
  headerHeight: any;
  isglobalLoaderActive: any;
  setIsglobalLoaderActive: (isglobalLoaderActive: any) => void;
  commonDetailsFetchLoader: any;
  setCommonDetailsFetchLoader: (isglobalLoaderActive: any) => void;
  router: (isglobalLoaderActive: any) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  cityData: undefined,
  setCityData: () => {},
  commonDetails: undefined,
  setCommonDetails: () => {},
  commonDetailsFetchLoader: false,
  setCommonDetailsFetchLoader: () => {},
  getpopularData: () => {},
  headerHeight: null,
  isglobalLoaderActive: false,
  setIsglobalLoaderActive: () => {},
  router: () => {},
});

const GlobalProvider: FC<{
  children: ReactNode;
  headerHeight: any;
  router: any;
}> = ({ children, headerHeight, router }) => {
  const [cityData, setCityData] = useState(null);
  const [isglobalLoaderActive, setIsglobalLoaderActive] = useState(false);
  const [commonDetails, setCommonDetails] = useState(null);
  const [commonDetailsFetchLoader, setCommonDetailsFetchLoader] = useState(false);

  // useEffect(() => {
  //   setIsglobalLoaderActive(false);
  // }, [router]);

  const getpopularData = async () => {};
  const globalContextValue = {
    cityData,
    setCityData,
    commonDetails,
    setCommonDetails,
    commonDetailsFetchLoader,
    setCommonDetailsFetchLoader,
    getpopularData,
    headerHeight,
    isglobalLoaderActive,
    setIsglobalLoaderActive,
    router,
  };

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <GlobalLoader isActive={isglobalLoaderActive} />
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);

export default GlobalProvider;
