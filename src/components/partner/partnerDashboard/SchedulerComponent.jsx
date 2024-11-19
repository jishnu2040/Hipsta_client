import React from 'react';
import { Scheduler } from 'devextreme-react/scheduler';
import { Template } from 'devextreme-react/core/template';

// Sample data for employees with avatars
const employees = [
  { id: 1, text: 'Alice', color: '#1e90ff', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, text: 'Bob', color: '#ff6347', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, text: 'Charlie', color: '#32cd32', avatar: 'https://i.pravatar.cc/150?img=3' },
];

// Sample data for appointments
const appointments = [
    {
      text: 'Meeting with Client A',
      startDate: new Date(2024, 11, 15, 10, 0),
      endDate: new Date(2024, 11, 15, 11, 0),
      employeeId: 1, // Assigned to Alice
    },
    {
      text: 'Project Discussion',
      startDate: new Date(2024, 11, 15, 12, 0),
      endDate: new Date(2024, 11, 15, 13, 0),
      employeeId: 2, // Assigned to Bob
    },
    {
      text: 'Team Meeting',
      startDate: new Date(2024, 11, 15, 14, 0),
      endDate: new Date(2024, 11, 15, 15, 0),
      employeeId: 3, // Assigned to Charlie
    },
    {
      text: 'Strategy Planning',
      startDate: new Date(2024, 11, 15, 9, 0),
      endDate: new Date(2024, 11, 15, 10, 30),
      employeeId: 4, // Assigned to Diana
    },
    {
      text: 'Sales Call with Client B',
      startDate: new Date(2024, 11, 15, 11, 30),
      endDate: new Date(2024, 11, 15, 12, 30),
      employeeId: 5, // Assigned to Evan
    },
    {
      text: 'Product Demo',
      startDate: new Date(2024, 11, 15, 13, 30),
      endDate: new Date(2024, 11, 15, 14, 30),
      employeeId: 1, // Assigned to Alice
    },
    {
      text: 'Marketing Meeting',
      startDate: new Date(2024, 11, 15, 15, 30),
      endDate: new Date(2024, 11, 15, 16, 30),
      employeeId: 2, // Assigned to Bob
    },
    {
      text: 'Client Feedback Session',
      startDate: new Date(2024, 11, 15, 16, 0),
      endDate: new Date(2024, 11, 15, 17, 0),
      employeeId: 3, // Assigned to Charlie
    },
    {
      text: 'Team Building Workshop',
      startDate: new Date(2024, 11, 15, 9, 30),
      endDate: new Date(2024, 11, 15, 11, 0),
      employeeId: 4, // Assigned to Diana
    },
    {
      text: 'Internal Review Meeting',
      startDate: new Date(2024, 11, 15, 10, 30),
      endDate: new Date(2024, 11, 15, 11, 30),
      employeeId: 5, // Assigned to Evan
    },
    {
      text: 'Tech Talk',
      startDate: new Date(2024, 11, 15, 17, 0),
      endDate: new Date(2024, 11, 15, 18, 0),
      employeeId: 1, // Assigned to Alice
    },
    {
      text: 'Final Project Review',
      startDate: new Date(2024, 11, 15, 13, 0),
      endDate: new Date(2024, 11, 15, 14, 30),
      employeeId: 2, // Assigned to Bob
    },
    {
      text: 'Budget Planning',
      startDate: new Date(2024, 11, 15, 15, 0),
      endDate: new Date(2024, 11, 15, 16, 0),
      employeeId: 3, // Assigned to Charlie
    },
  ];
  

const SchedulerComponent = () => {
  return (
    <div className="p-4">
      <Scheduler
        dataSource={appointments}
        defaultCurrentView="day"
        defaultCurrentDate={new Date(2024, 11, 15)}
        height={600}
        startDayHour={8}
        endDayHour={22}
        cellDuration={30}
        showAllDayPanel={false}
        
        // Define resources to group by employees with avatars
        resources={[
          {
            fieldExpr: 'employeeId',
            allowMultiple: false,
            dataSource: employees,
            label: 'Employee',
            valueExpr: 'id',
            displayExpr: 'text',
          },
        ]}
        
        // Group by employees
        groups={['employeeId']}
        
        // Use the itemTemplate to customize resource cell
        itemTemplate={(itemData) => {
          const employee = employees.find(e => e.id === itemData.employeeId);
          return (
            <div className="flex items-center space-x-2">
              <img src={employee.avatar} alt={employee.text} className="w-8 h-8 rounded-full" />
              <span>{employee.text}</span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default SchedulerComponent;
