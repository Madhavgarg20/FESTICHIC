import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { stringify } from 'postcss';

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [products, setProducts] = useState('');
  const [selectedSize, setSelectedSize] = useState('S'); // Default size
  const [quantity, setQuantity] = useState(1);
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const params = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      setProducts(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = () => {
    // Create a product object with size, quantity, name, and number
    
    const productWithDetails = {
      ...products,
      size: selectedSize,
      quantity: quantity,
      userName: userName,
      userNumber: userNumber,
      status: "Processing" //abv
    };
    if(userName == '' || userNumber == ''){
      toast.warn("Field is empty")
    }else{
      dispatch(addToCart(productWithDetails));
      // Check if the same item (based on id, size, name, and number) already exists in the cart

    
  
      // window.location.href ='/allproducts';
    }
    
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (userNumber.length > 2) {
      toast.warn("maximum length 2",{
        autoClose: 200,
        hideProgressBar: true,
      });
      setUserNumber(userNumber.slice(0, 2));
    }
  }, [userNumber]);

  useEffect(() => {
    // Ensure that quantity doesn't exceed the maximum value
    console.log(selectedSize);
    try {
      if (quantity > products.quantities[selectedSize]) {
        setQuantity(quantity-1);
        const mssg = `maximum qty reaches for ${selectedSize} size`
        toast(mssg);
      }
    } catch (error) {
    }
    
  }, [quantity]);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {products && 
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/3 w-50 lg:h-auto object-cover object-center rounded"
              src={products.imageUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {products.title}
              </h1>
              <div className="mb-4">
                <label htmlFor="size">Size:</label>
                <div className="flex space-x-4">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <div
                      key={size}
                      className={`cursor-pointer r p-2 border ${
                        selectedSize === size ? 'bg-indigo-500 text-white' : 'bg-white-600 text-gray-400'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => {
                    const inputValue = parseFloat(e.target.value);
                    if (!isNaN(inputValue) && inputValue > 0 && inputValue <= 10 ) {
                      setQuantity(inputValue);
                    }
                    if(inputValue > 10){
                      toast("maximum piece can buy at a time is 10")

                    }
                  }}
                  className="bg-white-600 text-black outline-black w-10"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-white-600 text-black outline-black"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="number">Number:</label>
                <input
                  type="text"
                  id="number"
                  value={userNumber}
                  onChange={(e) => setUserNumber(e.target.value)}
                  className="bg-white-600 text-black outline-black"
                  placeholder="Your Number"
                />
              </div>

              <div className="leading-relaxed border-b-2 mb-5 pb-5">
                {products.description}
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{products.price}
                </span>
                <button onClick={addCart} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>}
        </div>
      </section>
    </Layout>
  );
}
export default ProductInfo;
