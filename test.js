const axios = require('axios');

async function addSingleContact() {
  try {
    const postObj = {
      first_name: 'Ankur',
      last_name: 'Malik',
      email: 'ankur.malik@example.com',
      phone_numbers: ['7874656756', '8587476565', '9857645576'],
      company: 'Cognizant',
      position: 'Vice President',
      address: {
        street: '22-A, Gulmohar Apartments',
        city: 'Merrut',
        'zip-state': 'Uttar Pradesh - 250001',
        country: 'India',
      },
      tags: ['Leader', 'R&D'],
      createdAt: '2020-06-09T13:04:36.000Z',
      updatedAt: '2023-06-09T13:04:36.000Z',
    };
    const response = await axios.post(
      'http://localhost:3000/api/your-endpoint',
      postObj
    );
    console.log('response object', response);
  } catch (error) {
    console.log(error);
  }
}

addSingleContact();
