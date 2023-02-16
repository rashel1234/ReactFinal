import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export default function PriceSliderDialog(props) {
  const handleChange = (e, newValue) => {
    props.passInput({type: "price", value: newValue});
  }

  return (
    <Box sx={{ width: 300 }}>
            <Stack direction="row" sx={{ mb: 1, ml: 5}} alignItems="center">
                <Slider min={100} max={10000} step={100}
                    valueLabelDisplay="auto" onChange={handleChange}/>
            </Stack>
        </Box>
  );
}