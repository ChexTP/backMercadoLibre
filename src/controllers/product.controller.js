import Product from '../models/product.model.js'
import User from '../models/user.model.js'

export const createProduct = async (req,res) =>{
    const {
        name,
        category,
        description,
        price,
    }=req.body
    // console.log(name,description,price);
    const image = req.file ? req.file.path : null;
    try {    
        const newProduct = new Product({
            name,
            description,
            category,
            price,
            image
        })
        const productSaved = await newProduct.save()
        res.json({
            id:productSaved._id,
            name:productSaved.name,
            category:productSaved.category,
            description:productSaved.description,
            price:productSaved.price,
            image:productSaved.image
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getAllProducts = async (req,res)=>{  
    try {
        const products = await Product.find({})
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred fetching the products', error: error.message });
    }
}

export const getProductByUser = async (req,res) =>{
    const {idUser} = req.body
    try {
        const user = await User.findById(idUser).populate('product')
        // console.log(user);
        if(!user)return res.status(404).json({message:'User not found'})
        const products=user.product
        res.status(200).json({message:`products by user ${user.name}`,product:products})

    } catch (error) {
        res.status(500).json({ message: 'An error occurred fetching the product by user', error: error.message });
    }
}

export const getProductsByCategory = async (req,res) =>{
    const {category}=req.body
    try {
        const products = await Product.find({category:category})
        if(!products)return res.status(404).json({message:'Products not found'})
        
        res.status(200).json({message:`products by category ${category}`,product:products})

    } catch (error) {
        res.status(500).json({ message: 'An error occurred fetching the product by category', error: error.message });
    }
}

export const buyProduct = async (req,res) =>{
    const {
        idUser,
        idProduct
    }=req.body
    try {
        
        const user = await User.findById(idUser)
        if(!user)return res.status(404).json({message:'User not found'})
        const product = await Product.findById(idProduct)
        if(!product)return res.status(404).json({message:'Product not found'})
        user.product.push(product._id)
        user.save()
        const userUpdate = await User.findById(product._id).populate('product')
        res.status(200).json(userUpdate)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred buy the product for the user', error: error.message });
    }
}

export const updateProductById = async (req, res) => {
    const {
        idProduct,
        name,
        category,
        description,
        price,
    }=req.body
    // console.log(name,description,price);
    const image = req.file ? req.file.path : null;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            idProduct,
            {
                name,
                category,
                description,
                price,
                image
            },
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the Product', error: error.message });
    }
}

export const deleteProductById = async (req,res) => {
    const {idProduct} = req.body;

    try {
        const deletedProduct = await Product.findByIdAndDelete(idProduct);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product delete correctly' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the Product', error: error.message });
    }
}