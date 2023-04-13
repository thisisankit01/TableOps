import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getTransactions } from "./transaction";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/data", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10);
  const status = req.query.status as string | undefined;

  app.use(
    cors({
      origin: "https://tableops.netlify.app",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

  app.use(express.json());

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
