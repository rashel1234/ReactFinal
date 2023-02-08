import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function SearchDialog(props) {
    const [inputValue, setInputValue] = React.useState('');

    const handleFilter = () => {
        var result = {
            type: props.type, // text/number
            value: inputValue
        };

        props.passInput(result);
        props.handleClose();
    }

    return (
        <Dialog onClose={props.handleClose} open={props.open} PaperProps={{ sx: { position: "fixed", top: 150, left: 10, m: 0 } }}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={props.label}
            type={props.type}
            fullWidth
            variant="standard"
            onChange={e => {
                setInputValue(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={handleFilter}>Filter</Button>
        </DialogActions>
      </Dialog>
    );
}