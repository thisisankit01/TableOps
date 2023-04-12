import axios from "axios";
import { Transaction } from "./types";

type data = {
  data: Transaction[];
};

const API_URL = `http://localhost:3000/data`;

export const getTransactions = async (
  page: number,
  status?: string,
  type?: string
): Promise<Transaction[]> => {
  try {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (type) params.append("type", type);
    const response = await axios.get<data>(
      `${API_URL}?page=${page}&${params.toString()}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// const filteredTransactions = transactions.filter(transaction => {
//   return transaction.status === "ALLOW" && (transaction.type === "FIAT_DEPOSIT" || transaction.type === "CRYPTO_WITHDRAW");
// });

// console.log(filteredTransactions);
//${import.meta.env.SERVER_URL}
//&status=${status}&type=${type}
