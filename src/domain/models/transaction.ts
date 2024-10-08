import { Id } from "./id";
import { Category } from "./category";
import { Day } from "./day";

export enum TransactionOperation {
  Income = "INCOME",
  Outcome = "OUTCOME",
}

export interface TransactionParams {
  id?: Id;
  amount: number;
  category: Category;
  date: Day;
  description: string;
  operation: TransactionOperation;
  paymentMethod: string;
}

export class Transaction {
  readonly id: Id;
  readonly amount: number;
  readonly category: Category;
  readonly date: Day;
  readonly description: string;
  readonly operation: TransactionOperation;
  readonly paymentMethod: string;

  constructor(input: TransactionParams) {
    this.id = input.id || new Id();
    this.amount = input.amount;
    this.category = input.category;
    this.date = input.date;
    this.description = input.description;
    this.operation = input.operation;
    this.paymentMethod = input.paymentMethod;
  }

  get amountFormatted(): string {
    return (
      (this.isOutcome() ? "-" : "") +
      new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(this.amount)
    );
  }

  static isOutcome(operation: TransactionOperation): boolean {
    return operation === TransactionOperation.Outcome;
  }

  isOutcome(): boolean {
    return Transaction.isOutcome(this.operation);
  }

  toString(): string {
    return `Transaction for ${this.category.name} (${this.category.icon}) ${this.amountFormatted} on ${this.date.toString()} (${this.id.toString()}), via ${this.paymentMethod}`;
  }
}
