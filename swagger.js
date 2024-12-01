const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Players API",
    description: "An API that contains the data of socccer players",
  },
  host: "http://localhost:8080",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFile, doc);
