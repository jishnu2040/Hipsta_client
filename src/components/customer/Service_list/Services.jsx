import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

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
        // Handle error state or show a message to the user
      }
    };

    fetchServices();
  }, []);

  // Colors for the cards
  const colors = ['#FFB6C1', '#87CEFA', '#FFD700', '#98FB98', '#FF69B4', '#8A2BE2', '#FF6347', '#20B2AA'];

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
        List of Services
      </Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item key={service.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              sx={{ 
                backgroundColor: colors[index % colors.length], // Apply different background colors
                color: '#fff', // Text color
                boxShadow: 3, // Add some shadow for a 3D effect
                borderRadius: '10px', // Rounded corners
                '&:hover': { boxShadow: 6 }, // Elevate shadow on hover
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {service.name}
                </Typography>
                {/* Additional details or description if needed */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
