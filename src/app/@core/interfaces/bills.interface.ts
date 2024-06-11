export interface IBill {
  id?: number;
  product_id: string;
  customer_name: string;
  qty: number;
  total: number;
  employee_id: string;
  voucher_code?: string;
}
