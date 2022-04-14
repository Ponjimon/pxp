export function onRequest(context: EventContext<any, any, any>) {
  const upgradeHandler = context.request.headers.get('Upgrade');

  if (upgradeHandler !== 'websocket') {
    return new Response('Expected websocket', { status: 400 });
  }

  const [client, server] = Object.values(new WebSocketPair());
  server.accept();
  server.addEventListener('message', async ({ data }) => {
    if (data === 'PING') {
      server.send('PONG');
    } else {
      server.send('WAT');
    }
  });
  server.addEventListener('close', async evt => {
    console.log(evt);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
