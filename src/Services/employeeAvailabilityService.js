import axiosInstance from "../utlils/axiosinstance";

const API_URL = '/partner/employee-availability/';

export const fetchAvailability = (employeeId) => {
    if (!employeeId) throw new Error("Employee ID is required to fetch availability.");
    return axiosInstance.get(API_URL, {
        params: { employee_id: employeeId },
    });
};

export const createAvailability = (employeeId, availabilityData) => {
    if (!employeeId) throw new Error("Employee ID is required to create availability.");
    return axiosInstance.post(API_URL, {
        employee: employeeId, // Backend expects 'employee' instead of 'employee_id'
        ...availabilityData,
    });
};


export const updateAvailability = (availabilityId, availabilityData) => {
    if (!availabilityId) throw new Error("Availability ID is required to update availability.");
    return axiosInstance.patch(`${API_URL}${availabilityId}/`, availabilityData);
};

export const deleteAvailability = (availabilityId) => {
    if (!availabilityId) throw new Error("Availability ID is required to delete availability.");
    return axiosInstance.delete(`${API_URL}${availabilityId}/`);
};
