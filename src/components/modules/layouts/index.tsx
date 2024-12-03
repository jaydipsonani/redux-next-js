import {
  outfitRegular,
  outfitMedium,
  outfitSemiBold,
  outfitBold,
  // OutfitRegular,
  outfitDarkBold,
  poppinsBold,
  poppinsRegular,
} from '@/assets/fonts/fonts';
import GlobalProvider from '@/components/contexts/globalContext/context';
import { SidebarProvider } from '@/components/contexts/sidebarContext/context';
import Header from '@/components/rendering/header';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export interface LayoutPropType {
  page: any;
  children: any;
  popup?: any;
  router?: any;
  routerQuery?: any;
  userDataProps?: any;
}
export default function Layout({
  children,
  router,
  routerQuery,
  userDataProps,
}: LayoutPropType) {
  let globalFontVariableClass = classNames(
    poppinsBold.variable,
    poppinsRegular.variable,
    outfitRegular.variable,
    outfitSemiBold.variable,
    outfitMedium.className,
    outfitBold.variable,
    poppinsBold.variable,
    poppinsRegular.variable,
    // OutfitRegular.variable
    outfitDarkBold.variable
  );
  const route = useRouter();

  const headerRef = useRef<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const withOutFilterArray = ['/reservations', '/profile'];
  const isWithOutFilterHeader = withOutFilterArray.some((path) =>
    router.pathname.includes(path)
  );
  const isAuthRoute = router.pathname.startsWith('/auth');

  useEffect(() => {
    const handleResize = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [route]);

  return (
    <SidebarProvider>
      <Toaster />
      <GlobalProvider headerHeight={headerHeight} router={router}>
        <div>
          <main
            className={globalFontVariableClass}
            // style={{
            //   width: '100%',
            //   height: '100%',
            //   background: 'green',
            // }}
          >
            {!isAuthRoute && <Header />}

            <div>{children}</div>
          </main>
        </div>
      </GlobalProvider>
    </SidebarProvider>
  );
}
