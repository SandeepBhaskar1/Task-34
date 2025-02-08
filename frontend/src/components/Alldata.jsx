import React, { useEffect, useState } from 'react'

const Alldata = () => {
    const [data, setData] =useState([]);
    const [errorMessage, setErrorMessage] = useState('');

        const BACKEND_URL = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_BACKEND_CLOUD_URL
        : import.meta.env.VITE_BACKEND_LOCAL_URL;

        useEffect(() => {
            const fetchAllData = async () => {
                try {
                    const response = await fetch(`${BACKEND_URL}/responses`)
                    if(response.ok){
                        const allData = await response.json();
                        setData(allData);
                    } else {
                        setErrorMessage('Error fetching all data');
                    }
                } catch (error) {
                    setErrorMessage(`Error fetching data.`)
                }
            };
            fetchAllData();
        }, [BACKEND_URL]);
  return (
    <div>
      <h1>All Data Submitted</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {data.length === 0 ? (
        <p>No data found!</p>
      ) : (
        <ul>
            {data.map((item) => (
                    <li key={item.id}>
                        <p>{item.fullName}</p>
                        <p>{item.emailID}</p>
                        <p>{item.phoneNumber}</p>
                    </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default Alldata;