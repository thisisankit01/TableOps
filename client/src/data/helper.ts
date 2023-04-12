interface TransactionColumn {
  text: string;
  key: string;
}

export const transactionColumns: TransactionColumn[] = [
  {
    key: "destination-currency",
    text: "Destination Currency",
  },
  {
    key: "destination-amount",
    text: "Destination Amount",
  },
  {
    key: "transaction-state",
    text: "Transaction State",
  },
  {
    key: "origin-currency",
    text: "Origin Currency",
  },
  {
    key: "origin-amount",
    text: "Origin Amount",
  },
  {
    key: "timestamp",
    text: "Timestamp",
  },
  {
    key: "transaction-id",
    text: "Transaction ID",
  },
  {
    key: "destination-user-id",
    text: "Destination User ID",
  },
  {
    key: "origin-user-id",
    text: "Origin User ID",
  },
  {
    key: "type",
    text: "Type",
  },
  {
    key: "status",
    text: "Status",
  },
];

export const sortItems: TransactionColumn[] = [
  {
    key: "origin amount",
    text: "Origin Amount",
  },
];

export const filterItems: TransactionColumn[] = [
  {
    key: "allow",
    text: "allow",
  },
];
