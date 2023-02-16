import Typography from "@mui/material/Typography";
import { useEffect } from "react";

export default function Delete() {
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id){
        fetch(`http://localhost:9000/apartmentsData/id?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res) => {
          return res;
        })
        .then((data) => {
          console.log("deleted apt!");
        });
    }
  });

  return (
    <div>
      <Typography variant="h3">Deleted</Typography>
    </div>
  );
}
