import axiosInstance from "../utlils/axiosinstance";

const API_URL = '/partner/employee-availability/'; 





export const fetchAvailability = (employeeId) => {
    return axiosInstance.get(API_URL, {
        params: { employee_id: employeeId } 
    });
};

export const createAvailability = (availabilityData) => {
    return axiosInstance.post(API_URL, availabilityData); 
};

export const updateAvailability = (availabilityId, availabilityData) => {
    return axiosInstance.patch(`${API_URL}${availabilityId}/`, availabilityData);
};

export const deleteAvailability = (availabilityId) => {
    return axiosInstance.delete(`${API_URL}${availabilityId}/`); 
};
