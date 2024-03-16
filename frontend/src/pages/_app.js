import Head from 'next/head';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from '@/redux/store';


const App1 = (props) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);


  return (
    // <CacheProvider value={emotionCache}>
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        // transition: Zoom,
      />
      <Head>
        <title>
          Finance Kit
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          {/* <ThemeProvider theme={theme}> */}
            <CssBaseline />
              {
                getLayout(<Component {...pageProps} />)
              }
          {/* </ThemeProvider> */}
      {/* </LocalizationProvider> */}
    </>
  );
};

const App = (props) => (
  <Provider store={store}>
    <App1 {...props} />
  </Provider>
)

export default App;
