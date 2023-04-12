import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getTransactions } from "./transaction";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/data", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10);
  const status = req.query.status as string | undefined;
  // const originAmount = parseInt(req.query.originAmount as string, 10);

  try {
    const result = await getTransactions({ page, status });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
