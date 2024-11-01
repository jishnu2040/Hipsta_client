import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceTypes, setServiceType } from '../../Redux/slices/partnerSlice';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const dispatch = useDispatch();
  const serviceCategories = useSelector(state => state.partner.serviceCategories);
  const selectedServices = useSelector(state => state.partner.serviceType);
  const status = useSelector(state => state.partner.status);
  const error = useSelector(state => state.partner.error);

  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(fetchServiceTypes());
  }, [dispatch]);

  const handleServiceSelect = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      dispatch(setServiceType(selectedServices.filter(id => id !== serviceId)));
    } else {
      dispatch(setServiceType([...selectedServices, serviceId]));
    }
  };

  const handleSubmit = () => {
    const selectedServiceLabels = selectedServices.map(id => serviceCategories.find(service => service.id === id).name);
    console.log('Selected Services:', selectedServiceLabels);
    // Handle submission logic here (e.g., dispatch to Redux, API call)
    alert('Services submitted!'); // Replace with actual logic

    setTimeout(() => {
      navigate('/teamSize'); 
    }, 1000);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceCategories.map(service => (
            <div key={service.id} className="border p-4 rounded-lg cursor-pointer hover:bg-gray-200">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleServiceSelect(service.id)}
                />
                <span className="ml-2">{service.name}</span>
              </label>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit Services
        </button>
      </div>
    </div>
  );
};

export default Services;
