import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root',
})
export class RsaHelperService {
  //TODO: change keys
  publicKey = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8yK4s1ZUb89EMPcjcnXazid5HygO0aKVzMtHFDJ7pDuDcSDhrTdBFMLkXwC5qMQJ7/Md/r0xfaPKBEdwNxfQ6Goht/6cXQ4qoZalO/9RqIQBGR23HxZm6Nsqt3+bN/CB/cUjsTQ3qKRRN0n4vW+8K64vYl6w0sEiCDuF4G2Fdgqy7b9l/kL/wLSafi0vNHEQNUVTBAZYABl6XKCOdWs4Df/X+00Ft34BnA8ZKIAbRdWJ5XdoHsBzr1BQuCCgqPtGr0pPBLyDxYWm7hQnuqN6Fu7vXybf4HBCemRTHDVp7PavoDNW/oCuUuC80A+gQQjCavx9oDQ72bYjpVp3vwzeZQIDAQAB
  -----END PUBLIC KEY-----`;

  privateKey = `-----BEGIN RSA PRIVATE KEY-----
  MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDzIrizVlRvz0Qw9yNyddrOJ3kfKA7RopXMy0cUMnukO4NxIOGtN0EUwuRfALmoxAnv8x3+vTF9o8oER3A3F9DoaiG3/pxdDiqhlqU7/1GohAEZHbcfFmbo2yq3f5s38IH9xSOxNDeopFE3Sfi9b7wrri9iXrDSwSIIO4XgbYV2CrLtv2X+Qv/AtJp+LS80cRA1RVMEBlgAGXpcoI51azgN/9f7TQW3fgGcDxkogBtF1Ynld2gewHOvUFC4IKCo+0avSk8EvIPFhabuFCe6o3oW7u9fJt/gcEJ6ZFMcNWns9q+gM1b+gK5S4LzQD6BBCMJq/H2gNDvZtiOlWne/DN5lAgMBAAECggEATTwJ5To2z1/Nfyp6saj7jUJfyQRuFKzrnicy2Jkiyqx3GDBEUER9oY05g25VC+XebEFUFXBfMNSfX1WcMXwYykOwm2S/ohXWeAdFTPZRp9DrEmHsomz42t6IRss78PyvJoCB0pBOX/12qTQP1omQgmWuOrbuv7xHRcs2v3C7FSA5a6ebzJEpJzrOxB2klju6A738M+KYpmNLWESFq/lLGkkthPBHsSl5VdGaxN75ejqkRPWEz8JoeGpx4/dCEcuQ5/3DJTintO8DMoqdlEkZUQXmQD2xVwb2ia04e+0Zo5m0Aujtxsll3mJ4Ur5XbgQjc0hqd3Mv4rIwaof18NBSjwKBgQD2piCQduQyZlQD5CJHKw8twJy0r1W8guvNkK1yt33fiSf7iUQPF66jggyvR/PuBx0i6aglRFq//EqXqu0ThfugONIDYbmVSzczSWWj0uEOBplG78LiOVNuzJjHchfFBVzq57Rmy28GzV6m0sBR2BXC1sx/a3cn8FuMoRHfaFfHQwKBgQD8Wn7gGhIz9WDdcbwmOqCD223F5bCFV7xIo4tMxne4YJbDtYc5j/avvgfK1lzkNLcneDsU+HKlyaZA08k29dyaHbpxtS0cPTHthAk+0TR8TmsTVdH3QwzYsCckYdvpOqk5Xcb7kLArgVkBiyN3Wo+o0F0Aj/8/pwyBDuQbONRFNwKBgQClkG5bivMzQa0zz3eS/jx6IckPIIMUv20519wWHUXJP3AvULz2xJbd+vY40rvTE8NjJCVSnsesB9aqaHormMyHiJyw2HCS3qJ3MtWfWnbny1YoX9kZshFnVr9XYibCgg8VP+PA/N3SWxkmMmIWjk5NM5KiFakujhFmHNi6dng1sQKBgQDCUGyh43Fg0PFlks5uIXa4EZ7VY6gpBQXWaRg6ZhiJwNZWnNEjYddyO8GETsv4bR8bJVlZLHYbcsqx4GJwD6FuirWmGPxDYluvqJv14uGnVjrdCJhE7TxXHk0FltTfImxr3+n4i9Ebrt36ckk8/l7gfpEefcLuIJNgTTcYPwo0wQKBgAggD9vzfzpMuyqlGkefT2auxLtqnu7yns0SxD6enQ3r10aNsvgciI1XgXAGDnVUnCN1fAzhhqmFzeLtfv5GmuDM/is/KWzrTUBhk1Q4q/V3Hi1KiUrj90zbnFklo1x6KXliib8qGmg7LNqL7q6cPf/fLafNi9zgUJuVZxYQ6F+4
  -----END RSA PRIVATE KEY-----`;

  constructor() {}

  encryptData(valueToEncrypt: string): string {
    const handler = Forge.pki.publicKeyFromPem(this.publicKey);
    return window.btoa(handler.encrypt(valueToEncrypt));
  }

  decryptData(base64Data: string): string {
    const handler = Forge.pki.privateKeyFromPem(this.privateKey);
    return handler.decrypt(window.atob(base64Data));
  }

}
