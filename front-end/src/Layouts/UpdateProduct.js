import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams('');
    const navigate = useNavigate('');
    
    useEffect(()=>{
        getProductsByUpdate();
    },[])

    const getProductsByUpdate =async ()=>{
        let result = await fetch(`http://localhost:8080/product/${params.id}`,{
            headers:{authorization:`baerer ${JSON.parse(localStorage.getItem('token'))}`}
        });
            result = await result.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company)
    }
    // post api throuh insert the data
    async function UpdateProductBtn() {
        let result = await fetch(`http://localhost:8080/update/${params.id}`,
            {
                method : "PUT",
                body : JSON.stringify({name,price,category,company}),
                headers : {
                    'content-type': 'application/json',
                    authorization:`baerer ${JSON.parse(localStorage.getItem('token'))}`
                }
            }
        )
        result = await result.json();
        if(result){
            navigate('/');
        }
    }
    return (
        <div className="add-product">
            <h1>Update Product</h1>
            <input type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Product Name"></input>
            {/* {error && !name &&<span>** enter name</span>} */}

            <input type="text" value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Product price"></input>
            {/* {error && !price &&<span>enter price</span>} */}

            <input type="text" value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Product category"></input>
            {/* {error && !category &&<span>enter category</span>} */}


            <input type="text" value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter Product company"></input>
            {/* {error && !company &&<span>enter company</span>} */}

            <button type="submit"
                onClick={UpdateProductBtn}>Update Product</button>
        </div>

    )
};

export default UpdateProduct;