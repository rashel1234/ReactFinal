import * as React from 'react';
import Button from '@mui/material/Button';
import SearchDialog from '../Dialogs/SearchDialog';

import PriceSliderDialog from '../Dialogs/PriceSliderDialog';

export default function AdvancedSearch(props) {
    const [openArea, setOpenArea] = React.useState(false);
    const [openRooms, setOpenRooms] = React.useState(false);
    const [openPrice, setOpenPrice] = React.useState(false);
  
    const handleClickOpenArea = () => {
      setOpenArea(true);
    };
  
    const handleCloseArea = () => {
      setOpenArea(false);
    };

    const handleClickOpenRooms = () => {
        setOpenRooms(true);
    };

    const handleCloseRooms = () => {
        setOpenRooms(false);
    };

    const handleClickOpenPrice = () => {
        openPrice? setOpenPrice(false) : setOpenPrice(true);
    };

    const passInput = (input) => {
        props.handleAdvancedFilter(input);
    };
    
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpenArea}>
        Area
      </Button>
      <Button variant="outlined" onClick={handleClickOpenPrice}>
        Price
      </Button>
      <Button variant="outlined" onClick={handleClickOpenRooms}>
        Rooms
      </Button>

      {openPrice && (
         <PriceSliderDialog passInput = {(input) => {passInput(input)}} handleClose={handleCloseRooms}/>
      )}
      
      <SearchDialog title="Where do you want to stay?" label="Country/City" type="text" passInput = {(input) => {passInput(input)}} handleClose={handleCloseArea} open={openArea}></SearchDialog>
      <SearchDialog title="How many rooms do you need?" label="Rooms" type="number" passInput = {(input) => {passInput(input)}} handleClose={handleCloseRooms} open={openRooms}></SearchDialog>
    </div>
  );
}