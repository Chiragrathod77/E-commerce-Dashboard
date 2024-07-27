import React, { useEffect, useState } from "react";

const Add_Product = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error,setError]=useState(false);
 
    // post api throuh insert the data
    let Productbtn = async () => {
        // validation error check
        if(!name || !price || !category ||!company){
            setError(true)
            return false;
        }
        // aa rite aapde je user login hoi aeni id get krine db add krti vakhte kya user ae record insert kyro te check kri skiye chhiye
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId._id)

        let result =await fetch('http://localhost:8080/add_product',
            {
                method: "post",
                body: JSON.stringify({name, price, category, company,userId}),
                headers: {
                    'Content-type': 'application/json',
                    authorization:`baerer ${JSON.parse(localStorage.getItem('token'))}`
                    // it is jwt token integration above code
                }
            })
        result = await result.json();
        console.log(result);
        if (result) {
          alert('data insert successfully')
        }
    }


    return (
        <div className="add-product">
            <h1>Add Product</h1>
            <input type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Product Name"></input>
                {error && !name &&<span>** enter name</span>}

            <input type="text" value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Product price"></input>
                {error && !price &&<span>enter price</span>}

            <input type="text" value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Product category"></input>
                {error && !category &&<span>enter category</span>}

            {/* <select  aria-label="Default select example">
                <option selected>select the product category</option>
                <option value="1">Mobile</option>
                <option value="2">Tv</option>
                <option value="3">Laptop</option>
            </select> */}

            <input type="text" value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter Product company"></input>
                {error && !company &&<span>enter company</span>}

            <button type="submit"
                onClick={Productbtn}>Add Product</button>
        </div>
    )
};

export default Add_Product;