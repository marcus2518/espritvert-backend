import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
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
        email: "TODO"
      }
    },
    servers: [
      {
        url: "http://localhost:3000", // TODO real URL
        description: "Local server"
      },
      {
        url: "https://espritvert-14157.uc.r.appspot.com/", // TODO real URL
        description: "Deployed GCLOUD server"
      }
    ]
  },
  apis: ["routes/*.ts", "./routes/*.js", "./dist/routes/*.js"], // Paths to files where Swagger will look for annotations
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
