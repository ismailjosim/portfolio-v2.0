import { createHash } from 'crypto';
import { headers } from 'next/headers';

export async function getVisitorFingerprint() {
  const allHeaders = await headers();
  const ipAddress = allHeaders.get('x-forwarded-for') ?? allHeaders.get('x-real-ip') ?? 'unknown';
  const userAgent = allHeaders.get('user-agent') ?? 'unknown';
  const viewerInfo = `${ipAddress}::${userAgent}`;
  return createHash('sha256').update(viewerInfo).digest('hex');
}

/*
 * here x-forwarded-for or XFF header is used to get the IP address of the client.
 * this header contain real ip address of the client, when client request to the server.
 * also it contain multiple ip addresses when client request to the server through proxy.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-For
 * 
 * h.get('x-real-ip') header is used to get the IP address of the client.
 *  here use two option x-forwarded-for & x-real-ip. If first one not found then use second one. 
 * h.get('user-agent') header is used to get the user agent of the client. meaning information about the client browser, operating system, device, etc.
 *  
 * createHash('sha256').update(`${ip}::${ua}`).digest('hex') is used to create a hash of the client's IP address and user agent. this hash is used to identify the client.
 *  

*/
