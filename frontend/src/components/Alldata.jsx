import React, { useEffect, useState } from 'react';

const Alldata = () => {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const BACKEND_URL =
        import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_BACKEND_CLOUD_URL
            : import.meta.env.VITE_BACKEND_LOCAL_URL;

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/all-data`);
                if (response.ok) {
                    const allData = await response.json();
                    setData(allData);
                } else {
                    setErrorMessage('Error fetching all data');
                }
            } catch (error) {
                setErrorMessage('Error fetching data.');
            }
        };
        fetchAllData();
    }, [BACKEND_URL]);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    All Data Submitted
                </h1>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                {data.length === 0 ? (
                    <p className="text-center text-gray-500">No data found!</p>
                ) : (
                    <div>
                        <ul className="space-y-4">
                            {data.map((item) => (
                                <li key={item._id} className="bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 transition-colors">
                                    <p className="text-lg font-semibold text-gray-800">{item.fullName}</p>
                                    <p className="text-sm text-gray-600">{item.emailID}</p>
                                    <p className="text-sm text-gray-600">{item.phoneNumber}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alldata;
