import Typography from "@mui/material/Typography";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    console.log(localStorage.getItem("user"));
    localStorage.removeItem("user");
    console.log(localStorage.getItem("user"));
  });

  return (
    <div>
      <Typography variant="h3">Goodbye</Typography>
    </div>
  );
}
