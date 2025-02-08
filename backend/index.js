const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 2999;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL= process.env.NODE_ENV= 'production' ?
process.env.FRONTND_CLOUD_URL : process.env.FRONTEND_LOCAL_URL ;

app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    method: ['GET','POST'],
}));

const formSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailID: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error Connecting to MongoDB', err));

const Form = mongoose.model('Form', formSchema);

// Route to submit form data
app.post('/form', (req, res) => {
  const { fullName, emailID, phoneNumber } = req.body;
  const newForm = new Form({ fullName, emailID, phoneNumber }); 

  newForm
    .save()
    .then((savedForm) => {
      res.status(201).json({ message: 'Form submitted successfully', id: savedForm._id });
    })
    .catch((error) => {
      res.status(404).json({ message: 'Error in submitting form', error });
    });
});

// Route to get form data by ID
app.get('/response/:id', (req, res) => {
  const { id } = req.params;

  Form.findById(id)
    .then((form) => {
      if (!form) {
        return res.status(404).json({ message: 'Form Not Found' });
      }
      res.status(200).json(form);
    })
    .catch((error) => {
      res.status(404).json({ message: 'Error fetching data', error: error.message });
    });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, welcome to my Server' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
