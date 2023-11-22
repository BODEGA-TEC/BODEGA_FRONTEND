const hosts = {
  HOST: {
    production: "http://172.21.6.223:5050",
    staging: "http://172.21.6.223:5050",
    local: "http://localhost:5145",
  },
};

const host = hosts.HOST.staging;

const palettes = ["primary", "secondary"];
const defaultPalette = palettes[0];

export { host, defaultPalette };
