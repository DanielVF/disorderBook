WebSocketServer = require('ws').Server
wss = new WebSocketServer({ 
    port: 8080,
    path: "/ob/api/ws/trading_account/venues/MUTEX/tickertape/stocks/BREQ"
 });

dgram = require('dgram');
udpserver = dgram.createSocket('udp4');


udpserver.on('listening', () => {
  var address = udpserver.address();
  console.log(`Ticker listening ${address.address}:${address.port}`);
  console.log(`Websocket server on port 8080`);
});


udpserver.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udpserver.close();
});

udpserver.on('message', (msg, rinfo) => {
    ticker = msg.toString('utf8')
    wss.clients.forEach(function each(client) {
      client.send('{"ok": true, "quote":'+ticker+'}');
    });
});

udpserver.bind(12321);

