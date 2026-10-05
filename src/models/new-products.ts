import { Schema, model, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    sku: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    category: { 
      type: String, 
      required: true, 
      index: true 
    },
    brand: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    stock: { 
      type: Number, 
      required: true, 
      min: 0, 
      default: 0 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 0, 
      max: 5, 
      default: 0 
    },
    tags: { 
      type: [String], 
      default: [] 
    },
    specifications: { 
      type: Schema.Types.Mixed, 
      default: {} 
    },
    is_active: { 
      type: Boolean, 
      default: true 
    }
  },
  { 
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

export type IProduct = InferSchemaType<typeof productSchema>;
export const Product = model<IProduct>("Product", productSchema);