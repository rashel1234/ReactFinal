import { useState, useEffect } from 'react';

function useLogedInUserType(userEmail) {
  const [type, setType] = useState("");

  useEffect(() => {
    fetch("http://localhost:9000/users/byEmail", {
            method: 'POST',
            body: JSON.stringify({
                email: userEmail
            }),
            headers:{
              'Content-Type': 'application/json'
            }
          })
        .then((res)=>{
            return res.json();
        })
        .then((data) => {
          if(data != null)
            setType(data.type);
        });
  }, []);

  return type;
}

export default useLogedInUserType;