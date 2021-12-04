const express = require('express')
const app  = express();
const port = 5000;

app.get('/api/customers/', (req,res) => {
    const customers = [
        { id :1 , firstName: 'Amit' , lastName : 'Vishwakarma'},
        { id :2 , firstName: 'Sumit' , lastName : 'Vishwakarma'},
        { id :3 , firstName: 'Shweta' , lastName : 'Vishwakarma'},
    ];
    res.json(customers);
});

app.listen(port, () => console.log(`server is running on ${port}`));
