import http from 'k6/http';

export const options = {
  vus: 5000,
  duration: '300s',
};

export default function () {

  const ip = __ENV.TARGET_IP;
  const port = __ENV.TARGET_PORT;

  const url = `http://${ip}:${port}`;

  http.get(url);
}
