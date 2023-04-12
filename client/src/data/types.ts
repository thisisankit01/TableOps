export type Transaction = {
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
  origin: string;
};

export type DropdownSelect = {
  key: string;
  text: string;
};
