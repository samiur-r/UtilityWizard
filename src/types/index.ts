export type CourseType = {
  id: number;
  title: string;
  price: number;
};

export type OrderType = {
  id: number;
  title: string;
  price: number;
  buyerId: number;
};

export type PaymentType = {
  id?: string;
  stripeId: string;
  userId?: string;
  courseId?: string;
  amount: string;
  paymentDate?: Date;
  paymentMethod?: string;
  status: string;
  user: {
    connect: { id: string };
  };
};
