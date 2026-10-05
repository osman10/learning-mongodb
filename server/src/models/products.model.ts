import { Schema, model, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export type IProduct = InferSchemaType<typeof productSchema>;
export const Product = model<IProduct>("Product", productSchema);






