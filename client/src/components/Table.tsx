import { useEffect, useState, useRef } from "react";
import TableHeader from "./TableHeader";
import { sortItems, transactionColumns } from "../data/helper";
import { GrayColumn } from "./Column";
import { WhiteColumn } from "./Column";
import { getTransactions } from "../data/api";
import { Transaction, DropdownSelect } from "../data/types";
import { filterItems } from "../data/helper";
import DropdownButton from "./DropDown";

function TableComponent() {
  const [data, setData] = useState<Transaction[]>([]); //state for data from API
  const [page, setPage] = useState(1); //state for current page number
  const tableContainerRef = useRef<HTMLDivElement>(null); //useRef for scrolllistener in paging
  const [status, setStatus] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const tableContainer = tableContainerRef.current;
      if (!tableContainer) {
        return;
      }
      const { scrollTop, clientHeight, scrollHeight } = tableContainer;
      if (scrollTop + clientHeight >= scrollHeight) {
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

  // change page with status here
  useEffect(() => {
    const loadUserData = async () => {
      const newData = await getTransactions(page, status);
      setData((prevData) => {
        if (page === 1) {
          // if page number is 1, replace existing data with new data
          return newData;
        } else {
          // if page number is greater than 1, append new data to existing data
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
        }
      });
    };

    loadUserData();
  }, [page, status]);

  function handleSelect(selectedItem: string) {
    console.log("Selected item:", selectedItem);
    setStatus(selectedItem);
    setPage(1); // reset page number to 1
  }

  function handleSelectSort() {
    setData((prevData) => {
      const sortedData = [...prevData].sort((a, b) => {
        const aAmount = a?.originAmountDetails?.transactionAmount ?? 0;
        const bAmount = b?.originAmountDetails?.transactionAmount ?? 0;
        return aAmount - bAmount;
      });
      return sortedData;
    });
  }

  console.log(status);

  console.log(data);

  return (
    <div className="py-4">
      <div className="flex justify-center gap-10">
        <DropdownButton
          options={filterItems}
          label="Filter By"
          handleSelect={handleSelect}
        />
        <DropdownButton
          options={sortItems}
          label="Sort"
          handleSelect={handleSelectSort}
        />
      </div>
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
