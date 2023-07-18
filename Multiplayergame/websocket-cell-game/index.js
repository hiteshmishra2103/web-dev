const http = require("http");

const app = require("express")();

app.listen(3301, () => console.log("Listening on port 3301"));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

const httpServer = http.createServer();

//creating a websocket server
const webSocketServer = require("websocket").server;

httpServer.listen(3300, () => console.log("Listening on port 3300"));

//hashmap clients
const clients = {};
const games = {};

//creating a websocket server
const wsServer = new webSocketServer({
  httpServer: httpServer,
});

wsServer.on("request", (request) => {
  //creating a connection
  const connection = request.accept(null, request.origin);
  //when connection is open
  connection.on("open", () => console.log("opened"));

  //when connection is closed
  connection.on("close", () => console.log("closed!"));

  //what to do when message comes
  connection.on("message", (message) => {
    const result = JSON.parse(message.utf8Data);
    //I have received a message from a client
    //a user want to create a new game
    if (result.method === "create") {
      const clientId = result.clientId;
      const gameId = guid();
      games[gameId] = {
        id: gameId,
        balls: 20,
        clients: [],
      };

      const payload = {
        method: "create",
        game: games[gameId],
      };

      const con = clients[clientId].connection;
      con.send(JSON.stringify(payload));
    }

    //a client want to join
    if (result.method === "join") {
      const clientId = result.clientId;
      const gameId = result.gameId;
      const game = games[gameId];
      if (game.clients.length > 3) {
        //sorry max players reached
        return;
      }
      const color = { "0": "Red", "1": "Green", "2": "Blue" }[
        game.clients.length
      ];
      game.clients.push({
        clientId: clientId,
        color: color,
      });

      //assigning the client the color and a new clientId
      game.client.push({
        clientId: clientId,
        color: color,
      });

      const payLoad = {
        method: "join",
        game: game,
      };
      //loop through all clients and tell them people has joined
      game.clients.forEach((c) => {
        clients[c.clientId].connection.send(JSON.stringify(payLoad));
      });
    }

    console.log(result);
  });

  //generate a new clientId
  const clientId = guid();

  clients[clientId] = {
    connection: connection,
  };

  //The payload object is sent back to the client using connection.send().

  const payLoad = {
    method: "connect",
    clientId: clientId,
  };
  //send back the client connect, sends a "connect" message back to the client upon connection.
  connection.send(JSON.stringify(payLoad));
});

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
const guid = () =>
  `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
