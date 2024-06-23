import pool from '../db.config.js'

export const getAllProducts = async (req, res) => {
    try{
        const getProducts =  await pool.query("SELECT * FROM products")
        res.json({success:true, data: getProducts.rows})
    } catch(error) {
        res.status(500).json({  success:false, message: error.message})
    }
}

export const getSingleProduct = async (req, res) => {
    // Define the id
    const id = req.params.product_id;
    // query the product item.
    try {
        const getProduct = await pool.query('SELECT * FROM products WHERE product_id = $1', [id])
        // res.json(getProduct)
        if(getProduct.rowCount === 0) {
            res.status(404).json({ success:false, message: "User not found."})
        } else {
            res.status(200).json({success: true, data: getProduct.rows})
        }
        
    } catch(error) {
        res.status(500).json({ success: false, message: error.message})
    }

}

export const createNewProduct = async(req, res) => {
   
    // insert new items
    try{
    const {productThumbnail, productTitle, productDescription, productCost, onOffer} = req.body;
        if (!productThumbnail) return res.status(400).json({ success: false, message: "First name is required."})
        if (!productTitle) return res.status(400).json({ success: false, message: "Please enter a title."})
        if (!productDescription) return res.status(400).json({success: false, message: "Please enter a description"})
        if (!productCost) return res.status(400).json({ success: false, message: "Please enter product cost."})
        if (!onOffer) return res.status(400).json({ success: false, message: "Indicate if there is an offer or not."})
        

        const insertProducts = await pool.query("INSERT INTO products (productThumbnail, productTitle, productDescription, productCost, onOffer) VALUES ($1, $2, $3, $4,$5)", [productThumbnail, productTitle, productDescription, productCost, onOffer])
        if(insertProducts.rowCount === 1) {
            res.status(201).json({success: true, message: "User inserted successfuly."})
        } else {
            res.send(400).json({success:false, message: "Cannot store duplicate products"})
        }

    } catch(error){
    res.status(500).json({ success: false, message: error.message})
    }

}


export const updateSingleProduct = async (req, res) => {
    // destructure the columns to update.

    const {productThumbnail, productTitle, productDescription, productCost, onOffer} = req.body;
    const id = req.params.product_id;


    try{
        let updateProducts;
        
        if(productThumbnail) {
            updateProducts = await pool.query("UPDATE products SET productThumbnail = $1  WHERE product_id = $2", [productThumbnail, id])
        }

        if(productTitle) {
            updateProducts = await pool.query("UPDATE products SET productTitle = $1  WHERE product_id = $2", [productTitle, id])
        }
        if(productDescription) {
            updateProducts = await pool.query("UPDATE products SET productDescription = $1  WHERE product_id = $2", [productDescription, id])
        }
        if(productCost) {
            updateProducts = await pool.query("UPDATE products SET productCost = $1  WHERE product_id = $2", [productCost, id])
        }
        if(onOffer) {
            updateProducts = await pool.query("UPDATE products SET onOffer = $1  WHERE product_id = $2", [onOffer, id])
        }

        if(updateProducts.rowCount === 1) {
            res.status(200).json({success: true, message: "product updated successfully."})
        } else {
            res.status(400).json({success: false, message: "Invalid product."})
        }

    
    } catch(error){
        res.status(500).json({ success:false, message: error.message})
    }
}


export const deleteProduct = async (req, res)=> {
    const id = req.params.product_id;

    try{
        const deleteProduct = await pool.query("DELETE FROM products WHERE product_id = $1", [id])
        if (deleteProduct.rowCount === 1) {
            res.status(200).json({ success: true, message: "User successfully deleted."})
        } else {
            res.status(400).json({success:false, message: "Invalid user."})
        }

    } catch(error) {
        res.status(500).json({ success: false, message: error.message})
    }
}