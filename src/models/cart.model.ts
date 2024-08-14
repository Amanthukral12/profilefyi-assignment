import { Document } from "mongodb";
import { Types } from "mongoose";

export interface Cart extends Document {
  user: Types.ObjectId;
  cartItems: [
    {
      name: string;
      quantity: number;
      image: string;
      price: number;
      product: Types.ObjectId;
    }
  ];
  subTotal: number;
  discounts: {
    fixed: number;
    percentage: number;
  };
  totalPrice: number;
}
