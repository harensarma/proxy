#!/usr/bin/env node

var httpProxy = require("http-proxy");
const mkcert = require("mkcert");

console.log("This proxy server routes https://localhost:8545 traffic to http://localhost:8546");
try {
  mkcert
    .createCA({
      organization: "Broken Pie",
      countryCode: "SG",
      state: "Singapore",
      locality: "Singapore",
      validityDays: 3650
    })
    .then(ca =>
      mkcert.createCert({
        domains: ["127.0.0.1", "localhost", "207.244.248.151"],
        validityDays: 3650,
        caKey: ca.key,
        caCert: ca.cert
      })
    )
    .then(cert => {
      httpProxy
        .createServer({
          target: {
            host: "207.244.248.151",
            port: 8546
          },
          ssl: {
            key: cert.key,
            cert: cert.cert
          }
        })
        .listen(8545);
    });
} catch (e) {
  console.log("Error occured, is ganache running on port 8546?");
}
