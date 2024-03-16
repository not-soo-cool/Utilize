import PropTypes from 'prop-types';
// import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Dialog,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Scrollbar } from '@/components/scrollbar';
import { getInitials } from '@/utils/get-initials';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { UpdateOrders } from './orders-update';



export const OrdersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    onDeleteOrder,
    onUpdateOrder,
  } = props;

  const dialogSize = 'lg';

  const [upOpen, setUpOpen] = useState(false);
  const [list, setList] = useState();

  const upHandleClickOpen = (val) => {
    setList(val);
    setUpOpen(true);
  };

  const upHandleClose = () => {
    setUpOpen(false);
  };

  const handleReturnOrder = (val) => {
    onUpdateOrder(list._id, val);
    setUpOpen(false);
  }


  return (
    <>
      <Card >
        {/* <Scrollbar sx={{ border: '2px solid red' }}> */}
          <Box sx={{ minWidth: 800 }}>
            <Table >
              <TableHead>
                <TableRow >
                  {/* <TableCell padding="checkbox" >
                    <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.();
                        } else {
                          onDeselectAll?.();
                        }
                      }}
                    />
                  </TableCell> */}
                  <TableCell>
                    ID
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Product
                  </TableCell>
                  <TableCell>
                    Quantity
                  </TableCell>
                  <TableCell>
                    Order Value
                  </TableCell>
                  <TableCell >
                    {/* Order Value */}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {items && items.map((order) => {
                  return (
                    <TableRow
                      hover
                      key={order._id}
                      // selected={isSelected}
                    >
                      {/* <TableCell padding="checkbox" >
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(order._id);
                            } else {
                              onDeselectOne?.(order._id);
                            }
                          }}
                        />
                      </TableCell> */}
                      <TableCell>
                        {order.id}
                      </TableCell>
                        <TableCell 
                          sx={{
                            '&:hover': {
                              cursor: 'pointer'
                            }
                          }}
                          onClick = {() => upHandleClickOpen(order)}
                        >
                          {/* <Link href={`/orders/${order._id}`} style={{
                            textDecoration: 'none',
                            color: 'black'
                          }}> */}
                            <Stack
                              alignItems="center"
                              direction="row"
                              spacing={2}
                            >
                              <Avatar >
                                {getInitials(order.customer_name)}
                              </Avatar>
                              <Typography variant="subtitle2">
                                {order.customer_name}
                              </Typography>
                            </Stack>
                          {/* </Link> */}
                        </TableCell>
                      <TableCell>
                        {order.customer_email}
                      </TableCell>
                      <TableCell>
                        {order.product} 
                      </TableCell>
                      <TableCell>
                        {order.quantity}
                      </TableCell>
                      <TableCell>
                        {order.order_value}
                      </TableCell>
                      <TableCell sx={{
                        '&:hover': {
                          cursor: 'pointer'
                        }}} 
                        onClick={() => onDeleteOrder(order._id)}
                      >
                        <TrashIcon />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        {/* </Scrollbar> */}
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <Dialog 
        open={upOpen}
        onClose={upHandleClose}
        maxWidth={dialogSize}
      >
        <Grid item
          xs={12}
          md={4}
          lg={8}
        >
          <UpdateOrders
            order={list}
            onReturnOrder={handleReturnOrder} 
          />
        </Grid>
      
      </Dialog>
    </>
  );
};

OrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
