const hosts = {
  HOST: {
    production: "http://172.21.6.223:5050/api",
    staging: "http://172.21.6.223:5050/api",
    local: "http://localhost:5145/api",
  },
};

const host = hosts.HOST.local;

const theme = "primary";

export { host, theme };
