import axiosInstance from "../utlils/axiosinstance";

export const getPartnerAvailability = async () => {
  const response = await axiosInstance.get('/partner/availability/');
  return response.data;
};

export const createPartnerAvailability = async (data) => {
    const response = await axiosInstance.post('/partner/availability/', data); 
    return response.data;
  };

export const updatePartnerAvailability = async (id, data) => {
  const response = await axiosInstance.put(`/partner/availability/${id}/`, data);
  return response.data;
};

export const deletePartnerAvailability = async (id) => {
  const response = await axiosInstance.delete(`/partner/availability/${id}/`);
  return response.data;
};
