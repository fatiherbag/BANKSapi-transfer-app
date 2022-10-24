import { Transfer } from 'src/app/transfer.model';

const mockTransfer1: Transfer = {
  accountHolder: "Max Musterkind",
  iban: "DE75512108001245126199",
  date: "2022-07-03T15:55:46.936Z",
  amount: 100,
  note: "new transfer from Max Musterking",
  id: "1"
};

const mockTransfer2: Transfer = {
  accountHolder : "Max Mustermädchen",
  iban : "DE75512108001245126198",
  date : "2022-07-04T15:55:46.936Z",
  amount: 400,
  note: "A new transfer from Mustermädchen",
  id: "2"
};

const mockTransfer3: Transfer = {
  accountHolder: "Max Musterjunge",
  iban: "DE75512108001245126199",
  date: "2022-07-05T15:55:46.936Z",
  amount: 500,
  note: "A new transfer from Musterjunge",
  id: "3"
};

const mockTransferArray: Transfer[] = [mockTransfer1, mockTransfer2, mockTransfer3];

export { mockTransfer1, mockTransfer2, mockTransfer3, mockTransferArray };
