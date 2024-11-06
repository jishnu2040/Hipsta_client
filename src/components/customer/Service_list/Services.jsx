import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import ContentCutIcon from '@mui/icons-material/ContentCut'; // Salon icon
import SpaIcon from '@mui/icons-material/Spa'; // Spa icon
import FaceIcon from '@mui/icons-material/Face'; // Skincare icon
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'; // Massage icon

const Services = () => {
  const [services, setServices] = useState([]);
  const baseUrl = 'http://localhost:8000/api/v1'; // Replace with your API base URL

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/partner/service_type/`);
        if (response.status === 200) {
          setServices(response.data); // Assuming your API response is an array of service objects
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const getServiceIcon = (serviceName) => {
    switch (serviceName.toLowerCase()) {
      case 'salon':
        return <ContentCutIcon sx={{ fontSize: 40, color: '#6A1B9A' }} />; // Reduced icon size
      case 'spa':
        return <SpaIcon sx={{ fontSize: 40, color: '#388E3C' }} />;
      case 'skincare':
        return <FaceIcon sx={{ fontSize: 40, color: '#1976D2' }} />;
      case 'massage':
        return <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#D32F2F' }} />;
      default:
        return <ContentCutIcon sx={{ fontSize: 40, color: '#6A1B9A' }} />;
    }
  };

  return (
    <Box sx={{ padding: '1.5rem' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: '', fontWeight: 'medium', mb: 3 }}>
      Discover Our Services
      </Typography>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                textAlign: 'center', 
                boxShadow: 2, 
                borderRadius: '8px', // Slightly smaller border radius
                padding: '1.5rem', // Reduced padding
                '&:hover': { boxShadow: 4 },
              }}
            >
              <CardContent>
                {getServiceIcon(service.name)}
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mt: 1.5 }}>
                  {service.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
