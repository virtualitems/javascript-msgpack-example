import { encode, decode } from './@msgpack/msgpack/dist.es5+esm/index.mjs';


fetch('github.png')
  .then(response => response.blob())
  .then(blob => blob.stream().getReader().read())
  .then(stream => encode({ image: stream.value }))
  .then(encoded => {
    console.info('sent', encoded.length);
    return fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/msgpack',
        'Accept': 'application/msgpack',
      },
      body: encoded,
    });
  })

  /** @see server.js */

  .then(response => response.arrayBuffer())
  .then(buffer => {
    console.info('decoded', buffer.byteLength);
    return decode(buffer);
  })
  .then(decoded => {
    const blob = new Blob([decoded.image], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    const image = document.createElement('img');
    image.src = url;
    document.body.appendChild(image);
  })
  .catch(console.error);
