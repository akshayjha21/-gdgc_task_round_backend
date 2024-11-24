import express from 'express';

const app = express();
const port = process.env.PORT || 8010;

app.use(express.json()); // Fetching data in JSON format

let data = [];
let nextid = 1;

// POST ALL THE LIST ITEMS
app.post('/listings', (req, res) => {
  const { title, description, seller, rating } = req.body;
  const listing = { id: nextid++, title, description, seller, rating };
  data.push(listing);
  res.status(201).json({ data: listing });
});

// GET ALL THE LIST ITEMS
app.get('/listings', (req, res) => {
  res.status(200).json({ data: data });
});

// GET A LIST ITEM BY ID
app.get('/listings/:id', (req, res) => {
  const item = data.find(t => t.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.status(200).json({ data: item });
});

// EDIT A LIST ITEM BY ID
app.put('/listings/:id', (req, res) => {
  const item = data.find(t => t.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  const { title, description, seller, rating } = req.body;
  item.title = title;
  item.description = description;
  item.seller = seller;
  item.rating = rating;
  res.status(200).json({ data: item });
});

// DELETE A LIST ITEM BY ID
app.delete('/listings/:id', (req, res) => {
  const index = data.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  data.splice(index, 1);
  res.status(200).json({ message: 'OK' });
});

// LISTENING TO THE PORT
app.listen(port, () => {
  console.log(`App is listening at the port ${port}....`);
});
