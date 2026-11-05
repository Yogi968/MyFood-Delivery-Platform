import { CartState } from "../store/states/cart.state";

/**
 * Calculates the total number of items and total amount
 * based on the current cart items.
 *
 * @param items Current cart items
 * @returns Calculated cart totals
 */
export const calculateCartTotals = (items: CartState['items']) => {
  const totalItems = items.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const totalAmount = items.reduce(
    (total, cartItem) =>
      total + cartItem.menuItem.price * cartItem.quantity,
    0
  );

  return {
    totalItems,
    totalAmount,
  };
};