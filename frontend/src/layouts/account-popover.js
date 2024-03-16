import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Button, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { loadAdmin, logoutAdmin } from 'src/redux/Actions/AdminActions';
// import { loadInvestor, logoutInvestor } from 'src/redux/Actions/InvestorActions';
// import { loadCustomer, logoutCustomer } from 'src/redux/Actions/CustomerAction';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, user, onLogout } = props;
  // const uSer = userDetails.user;
  const router = useRouter();
  const dispatch = useDispatch()
  // const { admin, isAdminAuth, error } = useSelector(state => state.adminAuth)
  // const { investor, isInvestorAuth } = useSelector(state => state.investorAuth)
  // const { customer, isCustomerAuth } = useSelector(state => state.customerAuth)
  // const [ user, setUser ] = useState();

  const handleRoute = () => {
    if(user){
      router.push('/dashboard')
    }
  }

  const handleSignOut = async (e) => {
    e.preventDefault();
    onLogout();
    // window.open(
    //     `${process.env.REACT_APP_API_URL}/auth/logout`,
    //     "_self"
    // );
  }

  // useEffect(() => {
  //   dispatch(loadAdmin());
  //   dispatch(loadInvestor());
  //   dispatch(loadCustomer());
  // }, [dispatch])

  // useEffect(() => {
  //   if(admin){
  //     setUser(admin)
  //   } else if(investor){
  //     setUser(investor)
  //   } else {
  //     setUser(customer)
  //   }
  // }, [admin, investor, customer])


  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          <Button
            fullWidth
            variant="text"
            onClick={handleRoute}
          >
            {user ? user.displayName : ""}
          </Button>
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
