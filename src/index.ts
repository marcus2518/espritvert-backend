import express from "express";
import apiRouter from "./routes/apiRoutes";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "EspritVert Swagger API",
      version: "1.0.0",
      description: "API for EspritVert",
      contact: {
        name: "EspritVert",
        url: "TODO",
        email: "TODO",
      },
    },
    servers: [
      {
        url: "http://localhost:3000", // TODO real URL
        description: "Local server",
      },
      {
        url: "https://espritvert-14157.uc.r.appspot.com/", // TODO real URL
        description: "Deployed GCLOUD server",
      },
    ],
  },
  apis: ["routes/*.ts", "./routes/*.js", "./dist/routes/*.js"], // Paths to files where Swagger will look for annotations, for now I don't know how to use swagger directly w/ ts
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 8080;

console.log("Deploiement test");

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
