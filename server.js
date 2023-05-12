const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // path to your db.json file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(cors());
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
