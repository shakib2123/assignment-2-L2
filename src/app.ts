import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Assignment server is up and running!');
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found!',
    status: 404,
  });
});

export default app;
