export interface IVoucher {
  id?: number;
  voucher_code: string;
  discount_rate: number;
  valid_from: string;
  valid_to: string;
  description: string;
}
