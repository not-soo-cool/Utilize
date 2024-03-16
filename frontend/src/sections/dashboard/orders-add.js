import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Tabs,
  Tab
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { addCustomer } from 'src/redux/Actions/AdminActions';
// import { format } from 'date-fns';
import { toast } from 'react-toastify';


export const AddOrders = (props) => {

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

  const { onCreateOrder  } = props;


  const [details, setDetails] = useState({
    id: '',
    name: '',
    email: '',
    product: '',
    quantity: '',
    value: 0
  });


  const dispatch = useDispatch();

  const handleChange = (e) => {
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    if(e.target.name === 'quantity'){
      if(details.product !== ''){
        if(details.product === 'Product 1'){
          setDetails((prevState) => ({
            ...prevState,
            value: 29*e.target.value
          }));
        } else if(details.product === 'Product 2'){
          setDetails((prevState) => ({
            ...prevState,
            value: 49*e.target.value
          }));
        } else if(details.product === 'Product 3'){
          setDetails((prevState) => ({
            ...prevState,
            value: 149*e.target.value
          }));
        }
      }
    }
    if(e.target.name === 'product'){
      // console.log("In Prod")
      if(details.quantity !== ''){
        // console.log("Not In Prod")
        if(e.target.value === 'Product 1'){
          setDetails((prevState) => ({
            ...prevState,
            value: 29*details.quantity
          }));
        } else if(e.target.value === 'Product 2'){
          setDetails((prevState) => ({
            ...prevState,
            value: 49*details.quantity
          }));
        } else if(e.target.value === 'Product 3'){
          setDetails((prevState) => ({
            ...prevState,
            value: 149*details.quantity
          }));
        } else {
          setDetails((prevState) => ({
            ...prevState,
            value: 0
          }));
        }
      }
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(details.id==='' || details.name==='' || details.email==='' || details.product==='' || details.quantity==='' || details.value===''){
      toast.error("Fill details correctly", toastOptions);
    } else {
      onCreateOrder(details);
    }
  }


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Add Order"
          sx={{ mx: 1, mt: 1, color: 'rgb(99,102,241)', '& .MuiCardHeader-subheader' : { fontWeight: 'bold'} }}
        />
        <CardContent sx={{ pt: 0 }}>
          {/* <Tabs
            onChange={handleMethodChange}
            sx={{ mb: 2, mx: 2 }}
            value={method}
          >
            <Tab
              label="Add Customer"
              value="user"
            />
            <Tab
              label="Add Instalment"
              value="instal"
            />
          </Tabs> */}
          {/* {method === 'user' && */}
          <Box sx={{ m: -1, mx: 1 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="ID"
                  name="id"
                  onChange={handleChange}
                  required
                  value={details.id}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={details.name}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={details.email}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Product"
                  name="product"
                  onChange={handleChange}
                  required
                  value={details.product}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  type='number'
                  required
                  onChange={handleChange}
                  value={details.quantity}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Order Value"
                  name="value"
                  onChange={handleChange}
                  value={details.value}
                  InputProps={{readOnly: true}}
                />
              </Grid>
            </Grid>
            <Divider sx={{ borderColor: 'neutral.400', mt: 2.5, mb: 1 }} />
          </Box>


        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" sx={{m: 1}} type='submit'
          >
            Create Order
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
