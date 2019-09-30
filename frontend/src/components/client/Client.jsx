import React, {useState, useEffect} from "react";
import axios from 'axios';


const Client = () => {
  const [clientList, setClientList] = useState("hello world");

  useEffect(() => {

    const fetchData = async () => {
      try {
        const a = await axios(`/api/clients/`);
        setClientList(a.data[0]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="container mt-4">
    {JSON.stringify(clientList, null, 2)}
    </div>
  );
};

export default Client;
