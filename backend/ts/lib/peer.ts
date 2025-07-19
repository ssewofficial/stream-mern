import { PeerServer } from "peer"

const peerServer = PeerServer({
  port: 5000,
  path: "/peerjs",
});

export {peerServer as peer};