export interface IUnitOfWork {
  revert(): Promise<void>;
  commit(): Promise<void>;
  begin(): Promise<void>;
}
