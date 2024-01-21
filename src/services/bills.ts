import { db } from "@/lib/db";

const getBillsByUserId = async (userId: string) => {
  try {
    const bills = await db.bills.findMany({ where: { userId } });
    return bills;
  } catch {
    return null;
  }
};

export const updateBillPaymentStatus = async (
  billId: string,
  isPaid: boolean
) => {
  try {
    const updatedBill = await db.bills.update({
      where: {
        id: billId,
      },
      data: {
        isPaid: isPaid,
      },
    });
    return updatedBill;
  } catch (error) {
    console.log(error);
  }
};

export const createDummyBills = async (userId: string, meterId: string) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // Adjusted to exclude current month

  for (let i = 1; i <= 6; i++) {
    let month = currentMonth - i;
    let year = currentYear;
    if (month < 0) {
      month += 12;
      year -= 1;
    }

    const units = parseFloat((600 + Math.random() * 400).toFixed(2));
    const billAmount = parseFloat((units * 13.26).toFixed(2));
    const dueDate = new Date(year, month, 15);

    await db.bills.create({
      data: {
        month: month + 1,
        year,
        units,
        billAmount,
        dueDate,
        isPaid: false,
        user: {
          connect: { id: userId as string },
        },
        meter: {
          connect: { id: meterId as string },
        },
      },
    });
  }
};

export { getBillsByUserId };
