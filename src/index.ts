import express, { Request, Response, NextFunction } from "express";
import { admin, db } from "./firebaseAdmin";
import { register, signIn } from "./authService";

interface User {
  name: string;
  email: string;
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const snapshot = await db.collection("users").get();
    const users: User[] = snapshot.docs.map((doc) => doc.data() as User);
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body;
    await db.collection("users").add(user);
    res.status(201).send("User added successfully");
  } catch (error) {
    next(error);
  }
});

app.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = req.body;
      console.log(req.body.user);
      await register(req.body.user, req.body.password);
      res.status(201).send("User registered successfully");
    } catch (error) {
      next(error);
    }
  }
);

app.post("/signin", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body;
    await signIn(req.body.user, req.body.password);
    res.status(201).send("User registered successfully");
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
