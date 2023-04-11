import { useEffect, useState } from "react";
import axios from "axios";
import TableHeader from "./TableHeader";
import { transactionColumns } from "../helper";
import GrayColumn from "./GrayColumn";

interface Transaction {
  destinationAmountDetails: {
    transactionCurrency: string;
    transactionAmount: number;
  };
  transactionState: string;
  originAmountDetails: {
    transactionCurrency: string;
    transactionAmount: number;
  };
  timestamp: {
    $numberLong: string;
  };
  transactionId: string;
  destinationUserId: string;
  originUserId: string;
  type: string;
  status: string;
}

function TableComponent() {
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    loadUsersData();
  }, []);

  const page = 1;

  const loadUsersData = async () => {
    try {
      const response = await axios.get<Transaction[]>(
        `http://localhost:3000/data?page=${page}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  return (
    <div className="py-32">
      <div className="mx-auto shadow-md relative rounded-2xl border-2 w-[90rem] h-[36rem] overflow-y-scroll">
        <table className="text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="px-6 py-3">
              {transactionColumns.map((row: any) => (
                <TableHeader key={row.key} text={row.text} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((transactions) => (
              <tr key={transactions.transactionId}>
                <td className="border-b border-gray-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                  {transactions?.destinationAmountDetails?.transactionCurrency
                    ? transactions?.destinationAmountDetails
                        ?.transactionCurrency
                    : "--"}
                </td>
                {/* <td className="border-b border-gray-200 px-6 py-4">
                  {transactions?.destinationAmountDetails?.transactionAmount
                    ? transactions?.destinationAmountDetails?.transactionAmount
                    : "--"}
                </td> */}
                <GrayColumn>
                  {transactions?.destinationAmountDetails?.transactionAmount
                    ? transactions?.destinationAmountDetails?.transactionAmount
                    : "--"}
                </GrayColumn>
                <td className="border-b border-gray-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                  {transactions.transactionState
                    ? transactions.transactionState
                    : "--"}
                </td>
                <td className="border-b border-gray-200 px-6 py-4">
                  {transactions?.originAmountDetails?.transactionCurrency
                    ? transactions?.originAmountDetails?.transactionCurrency
                    : "--"}
                </td>
                <td className="border-b border-gray-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                  {transactions?.originAmountDetails?.transactionAmount
                    ? transactions?.originAmountDetails?.transactionAmount
                    : "--"}
                </td>
                <td className="border-b border-gray-200 px-6 py-4">
                  {transactions.timestamp.$numberLong
                    ? transactions.timestamp.$numberLong
                    : "--"}
                </td>
                <td className="border-b border-gray-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                  {transactions.transactionId
                    ? transactions.transactionId
                    : "--"}
                </td>
                <td className="border-b border-gray-200 px-6 py-4">
                  {transactions.destinationUserId
                    ? transactions.destinationUserId
                    : "--"}
                </td>
                <td className="border-b border-gray-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                  {transactions.originUserId ? transactions.originUserId : "--"}
                </td>
                <td className="border-b border-gray-200 px-6 py-4">
                  {transactions.type ? transactions.type : "--"}
                </td>
                <td className="border-b border-gray-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                  {transactions.status ? transactions.status : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableComponent;
