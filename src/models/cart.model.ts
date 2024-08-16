import { Document } from "mongodb";
import mongoose, { Schema, Types } from "mongoose";

export interface ICart extends Document {
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

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cartItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        product: {
          type: Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    fixedDiscount: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
