export interface IProduct {
    id?: number;
    name: string;
    price: number;
    sale_price?: number;
    image?: string;
    status: number;
    category_id?: string;
}
