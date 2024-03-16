import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
// import { withAuthGuard } from 'src/hocs/with-auth-guard';
// import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { useRouter } from 'next/router';
import axios from 'axios';

const SIDE_NAV_WIDTH = 0;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

// export const Layout = withAuthGuard((props) => {
export const Layout = ((props) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUser = async () => {
    try {
      const url = `http://localhost:2000/login/success`
      const {data} = await axios.get(url, { withCredentials: true });
      setLoading(false);
      setUser(data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  useEffect(() => {
    if(!loading && !user){
      router.push('/auth/login')
    }
  }, [user, loading])

  return (
    <>
    {
      !loading && user && 
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} user={user} />
      {/* <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      /> */}
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
      </>
    }
    </>
  );
});
