const CheckOut = ({ cartItems, setCartItems, storeStock, setStoreStock, totalBill, setTotalBill, storeIncome, setStoreIncome, recalculateTotal }) => {
  // update cart checkout total
  React.useEffect(() => {
    recalculateTotal();
  }, [cartItems]);

  // // checkout function by useEffect to handle states properly
  // React.useEffect(() => {
  //   checkout();
  // }, [])
  const checkout = () => {
    // add checkout total to storeIncome
    let newStoreIncome = Number((storeIncome + totalBill).toFixed(2));
    setStoreIncome(newStoreIncome);
    // reset cart (do not add items back to store)
    setCartItems([]);
    // reset storeStock originalstock to currentstock
    const products = [...storeStock];
    products.forEach((product) => {
      product.originalstock = product.currentstock;
    });
    setStoreStock(products);
    // reset checkout total
    setTotalBill(0.00);
  };

  return (
    <div className="px-2 pt-2 pb-3 text-end border-bottom border-2 mb-2 checkout-container">
      <span className="px-3 align-middle">Total: <span className="fw-semibold">${totalBill.toFixed(2)}</span></span>
      <button className="btn btn-outline-success text-end" onClick={checkout}>Checkout</button>
    </div>
  );
}
