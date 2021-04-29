import { Snackbar } from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//Reusable alert component
export default function AlertContainer({ open, setOpen, message, type }) {
  function handleClose() {
    setOpen(false);
  }
  return (
    <div>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
