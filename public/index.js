const Store = () => {
  const [storeStock, setStoreStock] = React.useState(products);
  const [cartItems, setCartItems] = React.useState([]);
  const [totalBill, setTotalBill] = React.useState(0.00);
  const [storeIncome, setStoreIncome] = React.useState(0.00);

  function recalculateTotal() {
    let total = 0.00;
    cartItems.forEach((item) => {
      total += item.incart * item.price;
      total = Number(total.toFixed(2));
    });
    setTotalBill(total);
  }

  async function restockStore() {
    const response = await axios.get('http://localhost:1337/api/products');
    const newProducts = response.data.data;
    const store = [...storeStock];
    newProducts.forEach((item) => {
      let storeindex = item.attributes.storeindex;
      let originalstock = item.attributes.originalstock;
      store[storeindex].originalstock += originalstock;
      store[storeindex].currentstock += originalstock;
      setStoreStock(store);
    });
  }


  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='pt-2 lead'>React & Strapi Store</h1>
        </div>
        <div className='col'>
          <p className='pt-2 text-end text-secondary'>
            <button className='btn btn-outline-secondary btn-sm mx-4' onClick={restockStore}>Restock Store</button>
            <span className='align-middle'>Store Income: ${storeIncome.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <div className='row py-4 store-layout'>
        <AvailableItems 
          storeStock={storeStock} setStoreStock={setStoreStock} 
          cartItems={cartItems} setCartItems={setCartItems} 
          recalculateTotal={recalculateTotal} 
        />
        <CustomerCart 
          cartItems={cartItems} setCartItems={setCartItems} 
          storeStock={storeStock} setStoreStock={setStoreStock} 
          totalBill={totalBill} setTotalBill={setTotalBill} 
          storeIncome={storeIncome} setStoreIncome={setStoreIncome}
          recalculateTotal={recalculateTotal} 
        />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Store />);
