import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { orderService } from "@/services/order.service";
import { useCart } from "@/hooks/useCart";
import { useAction } from "@/hooks/useAction";

export const useCheckout = () => {
  const { items } = useCart();
  const { reset } = useAction();
  const router = useRouter();

  const { mutate: createPayment, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['checkout'],
    mutationFn: async (): Promise<string> => {
      // 1. Создаем заказ
      const orderResponse = await orderService.createOrder({
        items: items.map(item => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id,
          storeId: item.product.storeId,
        })),
      });

      if (!orderResponse?.id) {
        throw new Error("Не удалось создать заказ: сервер не вернул ID заказа");
      }

      // 2. Создаем платеж в Stripe
      const paymentResponse = await orderService.createStripePayment(orderResponse.id);

      if (!paymentResponse?.url) {
        throw new Error("Не удалось создать платеж: отсутствует URL оплаты");
      }

      return paymentResponse.url;
    },
    onSuccess: (paymentUrl) => {
      // 3. Перенаправляем на страницу оплаты Stripe
      router.push(paymentUrl);
      reset();
      toast.success("Перенаправляем на страницу оплаты");
    },
    onError: (error: Error) => {
      console.error("Ошибка оформления заказа:", error);
      toast.error(error.message || "Ошибка при оформлении заказа");
    }
  });

  return useMemo(() => ({
    createPayment,
    isLoadingCreate
  }), [createPayment, isLoadingCreate]);
};