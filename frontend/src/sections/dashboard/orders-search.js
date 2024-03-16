import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useState } from 'react';

export const OrdersSearch = (props) => {

  const [ search, setSearch ] = useState("")

  const handleChange = (e) => {
    setSearch(e.target.value)
    props.onSearch(e.target.value);
  }

  return(
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={search}
        name='search'
        onChange={handleChange}
        fullWidth
        placeholder="Search customer"
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
      />
    </Card>
  )
};
