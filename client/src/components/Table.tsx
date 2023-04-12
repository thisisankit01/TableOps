import { useEffect, useState, useRef } from "react";
import TableHeader from "./TableHeader";
import { transactionColumns } from "../data/helper";
import GrayColumn from "./GrayColumn";
import WhiteColumn from "./WhiteColumn";
import { getTransactions } from "../data/api";
import { Transaction } from "../data/types";

function TableComponent() {
  const [data, setData] = useState<Transaction[]>([]); //state for data from API
  const [page, setPage] = useState(1); //state for current page number
  const tableContainerRef = useRef<HTMLDivElement>(null); //useRef for scrolllistener in paging
  let status = "allow";
  let type = "fiat_deposit";

  //logic for scroll hits bottom of the table
  useEffect(() => {
    const handleScroll = () => {
      const tableContainer = tableContainerRef.current;
      if (!tableContainer) {
        return;
      }
      const { scrollTop, clientHeight, scrollHeight } = tableContainer;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      const newData = await getTransactions(page, status, type);
      setData((prevData) => {
        const mergedData = [...prevData];
        for (const transaction of newData) {
          if (
            !prevData.some(
              (prevTransaction) =>
                prevTransaction.transactionId === transaction.transactionId
            )
          ) {
            mergedData.push(transaction);
          }
        }
        return mergedData;
      });
    };

    loadUserData();
  }, [page]);

  console.log(data);

  return (
    <div className="py-32">
      <div
        className="mx-auto shadow-md relative rounded-2xl border-2 w-[90rem] h-[36rem] no-scrollbar overflow-y-scroll table-scroll"
        ref={tableContainerRef}
      >
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
                <GrayColumn>
                  {transactions?.destinationAmountDetails?.transactionCurrency
                    ? transactions?.destinationAmountDetails
                        ?.transactionCurrency
                    : "--"}
                </GrayColumn>
                <WhiteColumn>
                  {transactions?.destinationAmountDetails?.transactionAmount
                    ? transactions?.destinationAmountDetails?.transactionAmount
                    : "--"}
                </WhiteColumn>
                <GrayColumn>
                  {transactions.transactionState
                    ? transactions.transactionState
                    : "--"}
                </GrayColumn>
                <WhiteColumn>
                  {transactions?.originAmountDetails?.transactionCurrency
                    ? transactions?.originAmountDetails?.transactionCurrency
                    : "--"}
                </WhiteColumn>
                <GrayColumn>
                  {transactions?.originAmountDetails?.transactionAmount
                    ? transactions?.originAmountDetails?.transactionAmount
                    : "--"}
                </GrayColumn>
                <WhiteColumn>
                  {transactions.timestamp.$numberLong
                    ? transactions.timestamp.$numberLong
                    : "--"}
                </WhiteColumn>
                <GrayColumn>
                  {transactions.transactionId
                    ? transactions.transactionId
                    : "--"}
                </GrayColumn>
                <WhiteColumn>
                  {transactions.destinationUserId
                    ? transactions.destinationUserId
                    : "--"}
                </WhiteColumn>
                <GrayColumn>
                  {transactions.originUserId ? transactions.originUserId : "--"}
                </GrayColumn>
                <WhiteColumn>
                  {transactions.type ? transactions.type : "--"}
                </WhiteColumn>
                <GrayColumn>
                  {transactions.status ? transactions.status : "--"}
                </GrayColumn>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableComponent;
