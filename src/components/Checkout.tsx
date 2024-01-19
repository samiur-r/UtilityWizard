"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import config from "@/config";
import { CourseType } from "@/types";
import Toast from "./Toast";

loadStripe(config.stripePublishableKey);

interface CheckoutProps {
  course: CourseType;
  user: any;
}

const Checkout: React.FC<CheckoutProps> = ({ course, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpts, setToastOpts] = useState({
    showToast: false,
    isToastError: false,
    toastMessage: "",
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("session_id"))
      setToastOpts({
        showToast: true,
        isToastError: false,
        toastMessage: "Payment Successful",
      });

    if (query.get("canceled"))
      setToastOpts({
        showToast: true,
        isToastError: true,
        toastMessage: "Order canceled - checkout when you’re ready.",
      });
  }, []);

  const handleCheckout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    const order = {
      id: course.id,
      title: course.title,
      price: course.price,
      buyerId: user.id,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("");

      const data = await res.json();

      window.location = data.url;
    } catch (error) {
      setToastOpts({
        showToast: true,
        isToastError: true,
        toastMessage: "Error: Payment failed",
      });
    }
    setIsLoading(false);
  };

  const resetToastValues = () => {
    setToastOpts({
      showToast: false,
      isToastError: false,
      toastMessage: "",
    });
  };

  return (
    <>
      <Toast
        showToast={toastOpts.showToast}
        isToastError={toastOpts.isToastError}
        toastMessage={toastOpts.toastMessage}
        reset={resetToastValues}
      />
      <form onSubmit={handleCheckout}>
        <button
          type="submit"
          className="flex w-full justify-center items-center gap-2 rounded-md bg- px-3 py-1.5 text-sm font-semibold leading-6 text-secondary shadow-sm bg-primary hover:bg-secondary hover:text-white"
        >
          {isLoading ? "Processing..." : `Pay $${course.price}`}
        </button>
      </form>
    </>
  );
};

export default Checkout;
