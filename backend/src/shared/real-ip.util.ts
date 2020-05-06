import { Request } from "express";

const headers = [
  "x-client-ip",
  "x-forwarded-for",
  "x-real-ip",
  "x-cluster-client-ip",
  "x-forwarded",
  "forwarded-for",
  "fowarded",
];

export function getRealIp(request: Request) {
  let ip = null;
  const found = headers.some(header => {
    ip = request.headers[header];
    return !!ip;
  });

  if (found) return ip;

  ip = request.socket?.remoteAddress;

  return ip;
}
