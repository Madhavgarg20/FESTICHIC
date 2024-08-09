import React, { useContext, useState } from 'react';
import myContext from '../../../context/data/myContext';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;

    // Local state to manage size-quantity pairs
    const [sizeQuantities, setSizeQuantities] = useState({
        S: products.quantities.S,
        M: products.quantities.M,
        L: products.quantities.L,
        XL: products.quantities.XL,
        XXL: products.quantities.XXL,
    });
    console.log("---m------",products);

    function onChangeQty(e,sizes) {
        const newQuantities = { ...products.quantities }; // Make a copy of the quantities dictionary
      newQuantities[sizes] = e.target.value;
        updateSizeQuantity(sizes, e.target.value);
        setProducts({ ...products, quantities: newQuantities })
      }

    // Function to update the size-quantity pairs
    const updateSizeQuantity = (sizes, quantities) => {
        if (!isNaN(quantities) && quantities >= 0 && quantities <= 1000) {
            setSizeQuantities({ ...sizeQuantities, [sizes]: quantities });
          }

    };

    console.log(products);

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.title}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name='title'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.price}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='price'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    {/* Place size-quantity input fields below price */}
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody >
                                {Object.keys(sizeQuantities).map((size) => (
                                    <tr key={size} >
                                        <td>{size}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={sizeQuantities[size]}
                                                onChange={(e) => onChangeQty(e, size)}
                                                name={size}
                                                className='bg-gray-600 rounded-lg text-white text-center'
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.imageUrl}
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            name='imageurl'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.category}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='category'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                        <textarea
                            cols='30'
                            rows='10'
                            name='title'
                            value={products.description}
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product desc'
                        ></textarea>
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={updateProduct}
                            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
