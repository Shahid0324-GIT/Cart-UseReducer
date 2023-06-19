export const getTotal = (cart) => {
  //   console.log(cart);

  let totalAmount = 0;
  let totalCost = 0;

  for (let item of cart.values()) {
    //   console.log(item);
    const { amount, price } = item;

    totalAmount += amount;
    totalCost += price * amount;
  }

  return { totalAmount, totalCost };
};
