import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const Cart = () => {
    
    const cartData = [
        {
            date: "Fri Aug 09 2024 00:00:00 GMT+0500 (Pakistan Standard Time)",
            from: "9 pm",
            id: "66a1a7e74ff9de1188d71afb",
            name: "Karachi Ground",
            price: 300,
            to: "10 pm",
            _id: "66a1a7e74ff9de1188d71a11",
        },
        // Add more items with different dates and same/different names
    ];
    const groupedItems = groupCartItems(cartData);
  return (
    <div>
      {Object.keys(groupedItems).map((name) => (
        <Card key={name} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
            {Object.keys(groupedItems[name]).map((date) => (
              <div key={date} style={{ marginLeft: 16 }}>
                <Typography variant="subtitle1">{date}</Typography>
                <List>
                  {groupedItems[name][date].slots.map((slot) => (
                    <React.Fragment key={slot._id}>
                      <ListItem>
                        <ListItemText
                          primary={`From: ${slot.from} To: ${slot.to}`}
                          secondary={`Price: $${slot.price}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to group items by name and date
const groupCartItems = (cartItems) => {
    return cartItems.reduce((acc, item) => {
      const { name, date } = item;
      const formattedDate = new Date(date).toLocaleDateString();
  
      if (!acc[name]) {
        acc[name] = {};
      }
      if (!acc[name][formattedDate]) {
        acc[name][formattedDate] = { slots: [] };
      }
      acc[name][formattedDate].slots.push(item);
  
      return acc;
    }, {});
  };
  
  export default Cart;