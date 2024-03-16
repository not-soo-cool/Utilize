import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
// import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
// import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, SvgIcon, TextField, Typography, useMediaQuery } from '@mui/material';
// import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from '@/layouts/layout';
// import { applyPagination } from 'src/utils/apply-pagination';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { OrdersSearch } from '@/sections/dashboard/orders-search';
import { OrdersTable } from '@/sections/dashboard/orders-table';
import { AddOrders } from '@/sections/dashboard/orders-add';
import { useDispatch, useSelector } from 'react-redux';
// import { addOrder, addInstalment, getAllOrders, getAllInvestors } from 'src/redux/Actions/AdminActions';
import { toast } from 'react-toastify';
import { applyPagination } from '@/utils/apply-pagination';
import { createOrder, deleteOrder, getAllOrders, updateOrder } from '@/redux/actions/orderActions';
import { UpdateOrders } from '@/sections/dashboard/orders-update';


const now = new Date();

const Page = (props) => {

  const user = props.userDetails;

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const [ isClient, setIsClient ] = useState(false);

  const dialogSize = 'lg';

  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.getAllOrders)

  const { message, error } = useSelector(state => state.createOrder)
  const { message: delMessage, error: delError } = useSelector(state => state.deleteOrder)
  const { message: updateMessage, error: updateError } = useSelector(state => state.updateOrder)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ordersAv, setOrdersAv] = useState();
  // const [ordersIds, setOrdersIds] = useState();
  // const ordersSelection = useSelection(ordersIds);

  const [ ordersList, setOrdersList ] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [sum, setSum] =  useState(0);
  const [progress, setProgress] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  // const { message, error } = useSelector(state => state.orders)
  // const { message: instalMessage, error: instalError } = useSelector(state => state.addInstalments)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleData = (value) => {
    dispatch(createOrder(value.id, value.name, value.email, value.product, value.quantity, value.value))
    setOpen(false);
  }

  const handleUpdateData = (id, val) => {
    // toast.success("Working", toastOptions)
    dispatch(updateOrder(id, val))
    // setOpen(false);
  }


  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleSearch = (val) => {
    const searches = orders.filter(item => item.customer_name.toLowerCase().includes(val.toLowerCase()));
    setCount(searches.length)
    setOrdersList(searches);
    setOrdersAv(applyPagination(searches, page, rowsPerPage))
  }

  const handleDelete = (id) => {
    dispatch(deleteOrder(id))
  }

  const logout = (e) => {
    e.preventDefault()
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/logout`,
			"_self"
		);
	};

  useEffect(()=> {
    if(orders){
      setOrdersList(orders);
      let add=0;
      for (const order of orders) {
        add = Number(add) + Number(order.order_value)
      }
      setSum(add);
    }
  }, [orders])

  useEffect(() => {
    if(ordersList){
      setCount(ordersList.length)
      setOrdersAv(applyPagination(ordersList, page, rowsPerPage))
    }
  }, [ordersList, page, rowsPerPage])

  useEffect(() => {
    setIsClient(true);
    dispatch(getAllOrders())
  }, [isClient, dispatch])

  useEffect(() => {
    if(message){
      toast.success(message, toastOptions);
      dispatch({type: "clearMessage"});
    }
    if(error){
      toast.error(error, toastOptions);
      dispatch({type: "clearErrors"});
    }
    if(delMessage){
      toast.success(delMessage, toastOptions);
      dispatch({type: "clearMessage"});
    }
    if(delError){
      toast.error(delError, toastOptions);
      dispatch({type: "clearErrors"});
    }
    if(updateMessage){
      toast.success(updateMessage, toastOptions);
      dispatch({type: "clearMessage"});
    }
    if(updateError){
      toast.error(updateError, toastOptions);
      dispatch({type: "clearErrors"});
    }
  }, [message, error, delMessage, delError, updateMessage, updateError])


  return (
    <>
      <Head>
        <title>
          Orders | Finance Kit
        </title>
      </Head>

      {isClient && 
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack direction="row" alignItems="center" spacing={3}>
                <Typography variant="h4">
                  Order Total -
                </Typography>
                <Typography variant="h5">
                  {sum}
                </Typography>
                
              </Stack>
              <div>
                <Button 
                  onClick={handleClickOpen}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <OrdersSearch onSearch={handleSearch} />
            {orders && 
            <OrdersTable
              orders={orders}
              count={count}
              items={ordersAv}
              // onDeselectAll={ordersSelection.handleDeselectAll}
              // onDeselectOne={ordersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              // onSelectAll={ordersSelection.handleSelectAll}
              // onSelectOne={ordersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              onDeleteOrder={handleDelete}
              onUpdateOrder={handleUpdateData}
              progress={progress}
            />}
          </Stack>
        </Container>
      </Box>
      }

      <Dialog 
        open={open}
        onClose={handleClose}
        maxWidth={dialogSize}
      >
          <Grid item
            xs={12}
            md={4}
            lg={8}
          >
            <AddOrders 
              orders={orders}
              onCreateOrder={handleData} 
            />
          </Grid>
        
      </Dialog>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
