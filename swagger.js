const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Players API",
    description: "An API that contains the data of socccer players",
  },
  host: "https://project-03-irq1.onrender.com",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFile, doc);
