import { db } from "@/lib/db";
import { PaymentType } from "@/types";

const createPayment = async (paymentData: PaymentType) => {
  try {
    const payment = await db.payment.create({
      data: paymentData,
    });
    return payment;
  } catch (error) {
    console.error("Error creating payment: ", error);
    throw error;
  }
};

export { createPayment };
