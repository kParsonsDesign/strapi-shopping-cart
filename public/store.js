const AvailableItems = ({ storeStock, setStoreStock, cartItems, setCartItems, recalculateTotal }) => {

  const addItemToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const store = [...storeStock];
    const cart = [...cartItems];
    const qty = Number(e.target.form[0].value);
    const pid = e.target.attributes.productid.nodeValue;
    const index = Number(e.target.form.attributes.productindex.nodeValue);
    
    
    // add product to cart
    // check for product with matching id
    function filterById(item, index) {
      if (item.pid === pid) {
        cartIndex = index;
        return true;
      };
      return false;
    }
    // if cart does not have item with matching pid, the add item to cart
    let cartIndex;
    const match = cart.filter(filterById);
    if (match.length === 0) {
      const newItem = store.filter(filterById);
      newItem[0].incart = qty;
      cart.push(...newItem);
      setCartItems(cart);
    } 
    // if cart already has item with matching pid, then increase incart qty
    else {
      cart[cartIndex].incart = cart[cartIndex].incart + qty;
      setCartItems(cart);
    }
    
    // remove qty ammount from storeStock
    store[index].currentstock = store[index].originalstock - store[index].incart;
    setStoreStock(store);

    // reset input qty to 1
    document.getElementById('qty-' + pid).value = '1';
  }

  // async function getProducts() {
  //   try {
  //     // Make a request
  //     const response = await axios.get('http://localhost:1337/api/products');
  //     // handle success
  //     console.log(response);
  //   } catch (error) {
  //     // handle error
  //     console.log(error);
  //   }
  // }
  // getProducts();

  

  return (
    <div className="my-2 store-container">
      <h3>Products</h3>
      <div className="container">
        <div className="row">
          {storeStock.map((product, index) => {
            let productid = product.pid;
            return (
              <div className="col-6 col-md-4 card p-1" key={index}>
                <img className="card-img-top" style={{maxWidth:'20rem'}}
                  src={product.image} alt={product.brand + " " + product.name} 
                />
                <div className="card-body p-2">
                  <h5 className="card-title">
                    {product.name} {product.type && " - " + product.type}
                  </h5>
                  <p className="card-text">
                    Price: ${product.price} <br />
                    Size: {product.size} <br />
                    {product.currentstock > 0 && <span>In Stock: {product.currentstock}</span>}
                  </p>
                  {product.currentstock > 0 ? 
                  <form id={'add-' + product.pid} productindex={index}>
                    <div className="input-group">
                      <input id={'qty-' + product.pid} className='form-control' type="number" size="2" min="1" max={product.currentstock} defaultValue="1" />
                      <button type="button" form={'add-' + product.pid} id={'btn-' + product.pid} productid={product.pid} className='btn btn-outline-primary' onClick={addItemToCart}>Add to Cart</button>
                    </div>
                  </form>
                  : <p className='text-secondary'>Sorry, item is out of stock.</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const products = [
  {
    name: "Raspberries",
    type: "Red",
    brand: "Driscoll's",
    size: "6 oz",
    origin: { country: "USA", state: "CA", city: "Oxnard" },
    price: 4.99,
    originalstock: 50,
    currentstock: 50,
    image:
      "https://www.freshdirect.com/media/images/product/fruit_2/br_raspbrry_z.jpg?lastModify=2016-11-29",
    pid: 'F01',
    storeindex: 0,
  },
  {
    name: "Grapes",
    type: "Red Seedless",
    brand: "Fresh Link",
    size: "32 oz",
    origin: { country: "USA", state: "CA", city: "Visalia" },
    price: 4.99,
    originalstock: 3,
    currentstock: 3,
    image: 'https://images.albertsons-media.com/is/image/ABS/184100012?$ecom-pdp-desktop$&defaultImage=Not_Available&defaultImage=Not_Available',
    pid: 'F02',
    storeindex: 1,
  },
  {
    name: "Blueberries",
    type: "Organic",
    brand: "Driscoll's",
    size: "6 oz",
    origin: { country: "USA", state: "CA", city: "Oxnard" },
    price: 5.99,
    originalstock: 8,
    currentstock: 8,
    image: 'https://images.freshop.com/147307/3b63f7abcba79f0f7be12b87e9403e88_large.png',
    pid: 'F03',
    storeindex: 2,
  },
  {
    name: "Apples",
    type: "Red Delicious",
    brand: "Tom Langel",
    size: "3 lb",
    origin: { country: "USA", state: "IL", city: "Springfield" },
    price: 4.39,
    originalstock: 15,
    currentstock: 15,
    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1479152052%2F1611w-getty-bag-red-apples_0.jpg%3Fitok%3DDrLBXSZm&w=400&c=sc&poi=face&q=60',
    pid: 'F04',
    storeindex: 3,
  },
  {
    name: "Apples",
    type: "Granny Smith",
    brand: "Harvest Sensations",
    size: "3 lb",
    origin: { country: "USA", state: "CA", city: "Los Angeles" },
    price: 4.12,
    originalstock: 20,
    currentstock: 20,
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQhdkq1wupzNUaJ-oL-h_MZoHaiQCtzqYyExg4GLQw3UdV2XUDq8Y0K7X73A-x9Yx9JLKysqwEPEZeC1Pl430vtcrs6AA7vlQ&usqp=CAE',
    pid: 'F05',
    storeindex: 4,
  },
  {
    name: "Orange",
    type: "Valencia",
    brand: "Sunkist",
    size: "4 lb",
    origin: { country: "USA", state: "FL", city: "Pensacola" },
    price: 5.59,
    originalstock: 30,
    currentstock: 30,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS_NRuuGGKVbX88CgwX9ZOUWGBkKXB0CPRG4TRfx-TfjVXa1U9eyE6iZ2uEtfqWiL7kt45vSaMOPmaLM__kiNrCFhAL42u5XLr9Zw3gT6Y&usqp=CAE',
    pid: 'F06',
    storeindex: 5,
  },
  {
    name: "Orange",
    type: "Navel",
    brand: "Sunkist",
    size: "2 lb",
    origin: { country: "USA", state: "CA", city: "Orange" },
    price: 2.27,
    originalstock: 10,
    currentstock: 10,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR7nR9T660sHTgxDtGn9vCaRgcjdqdV2jouUd7IKDYZJ55EdVBL5mO_b5JvLtdKoS2zFxXZIbdZ3xIuElfdglZp5xi3BPZMfg&usqp=CAE',
    pid: 'F07',
    storeindex: 6,
  },
];
