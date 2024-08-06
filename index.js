const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.json());

app.use('/users', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`This is the current port ${PORT}`));