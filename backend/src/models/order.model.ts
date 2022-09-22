import { Schema, model, Types, Date } from "mongoose";
import { OrderStatus } from "../constants/order_status";
import { Food, FoodSchema } from "./food.model";

export interface LatLng {
    lat: string;
    lng: string;
}

export const LatLngSchema = new Schema<LatLng>(
    {
        lat: { type: String },
        lng: { type: String },
    }
);

export interface orderItem {
    food: Food;
    price: number;
    quantity: number;
}

export const OrderItemSchema = new Schema<orderItem>(
    {
        food: { type: FoodSchema, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }
);

export interface Order {
    id: number;
    items: orderItem[];
    totalPrice: number;

    name: string;
    address: string;
    addressLatLng: LatLng;
    paymentId: string;
    createAt: string;
    status: OrderStatus;

    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const orderSchema = new Schema<Order>(
    {
        name: { type: String, required: true },
        address: { type: String },
        addressLatLng: { type: LatLngSchema },
        paymentId: { type: String },
        totalPrice: { type: Number, required: true },
        items: { type: [OrderItemSchema], reqquired: true },
        status: { type: String, default: OrderStatus.NEW },
        user: { type: Schema.Types.ObjectId, required: true }
    }, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
}
);
export const OrderModel = model<Order>('order', orderSchema)