import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductShow = () => {
    const [products, setProducts] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    //integrate delete  api
    const deleteBTn =async (id)=>{
        let result =await fetch(`http://localhost:8080/delete/${id}`,
           { method : "Delete",
            headers:{authorization:`baerer ${JSON.parse(localStorage.getItem('token'))}`}
           }
       );
        result = await result.json();
       if(result)
        getProducts();
       }
    

    //    Search api integration
    const searchProduct = async(event)=>{
        let key = event.target.value;
        if(key)
        {
            let result = await fetch(`http://localhost:8080/search/${key}`,{
                // api jwt token integration
                headers:{authorization:`baerer ${JSON.parse(localStorage.getItem('token'))}`}
            });
            result =await result.json();
            if(result)
            {
                setProducts(result);
            }
        }
        else{
            getProducts();
        }
    }

    //  integrate get api through show the record in browers
    let getProducts = async () => {
        let result = await fetch('http://localhost:8080/product',{
            headers:{authorization:`baerer ${JSON.parse(localStorage.getItem('token'))}`}
        })
        result = await result.json();
        setProducts(result);
    };
    
    return (
        <div class="product-table">
            <h1>Product Lists</h1>
            <input type ="search" 
            onChange={searchProduct} placeholder="search product"></input>
           <table>
                <thead>
                    <tr>
                        <th>No..</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                    products.length > 0 ? (
                        products.map((product, index) => (
                            <tr >
                                <td>{index+1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.company}</td>
                                <td>
                                    <button onClick={()=>deleteBTn(product._id)}>Delete</button>&nbsp;&nbsp;
                                    <Link to={'/update/'+product._id}><button>Update</button></Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )};

export default ProductShow;