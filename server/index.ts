import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getTransactions } from "./transaction";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/data", async (req: Request, res: Response) => {
  const { page } = req.query;

  try {
    const result = await getTransactions({ page });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
