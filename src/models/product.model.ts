import { Document } from "mongodb";
import mongoose, { Schema, Types } from "mongoose";

export interface IProduct extends Document {
  user: Types.ObjectId;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  discountPercentage: number;
}

const productSchema = new Schema<IProduct>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, "Stock is required"],
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.methods.calculateDiscountedPrice = function () {
  const discountPrice = this.price * (this.discountPercentage / 100);
  return Number(this.price - discountPrice);
};

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
