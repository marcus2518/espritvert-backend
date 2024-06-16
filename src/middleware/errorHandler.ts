import { Request, Response } from "express";

const errorHandler = (err: Error, _req: Request, res: Response) => {
  res.status(500).send({ error: err.message });
};

export default errorHandler;
