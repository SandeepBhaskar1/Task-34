import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Response = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_BACKEND_CLOUD_URL
        : import.meta.env.VITE_BACKEND_LOCAL_URL;

    const handleNewForm = () => {
        navigate('/');
    };


    useEffect(() => {
        if (!id) {
            setErrorMessage('Invalid ID');
            return;
        }

        const fetchFormData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/response/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    setErrorMessage('Form Data not found');
                }
            } catch (error) {
                setErrorMessage('Error fetching data');
            }
        };
        fetchFormData();
    }, [id, BACKEND_URL]);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Submitted Data
                </h1>

                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

                {formData ? (
                    <div>
                        <p>
                            <strong>Full Name: </strong>
                            {formData.fullName}
                        </p>
                        <p>
                            <strong>Email ID: </strong>
                            {formData.emailID}
                        </p>
                        <p>
                            <strong>Phone Number: </strong>
                            {formData.phoneNumber}
                        </p>
                    </div>
                ) : (
                    <p className="text-center">Loading...</p>
                )}
                <button onClick={handleNewForm} 
                className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Submit Another Form
                    </button>

                <button 
                onClick={()=>navigate('/all-submitted-data')}
                className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                View All Submitted Data</button>
            </div>
        </div>
    );
};

export default Response;
