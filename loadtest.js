import http from 'k6/http';

export const options = {
  vus: 5000,
  duration: '300s',
};

export default function () {
  http.get(__ENV.TARGET_URL);
}
