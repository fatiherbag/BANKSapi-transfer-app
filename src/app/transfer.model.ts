export interface Transfer{
  id: string;
  accountHolder: string;
  iban: string;
  amount: number;
  date: Date; //check it later
  note: string;
}
