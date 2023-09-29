const app = require('./app');

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Express Server started successfully on port: ${PORT} 🚀🚀🚀`);
});

process.on('unhandledRejection', (err) => {
  console.log(err, err.name, err.msg);
  console.log('SHUTTING DOWN THE SERVER🎇🎇');
  server.close(() => {
    process.exit(1);
  });
});
