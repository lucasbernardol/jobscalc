const app = require('./app');

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`\nURL: ${HOST}`);
});
