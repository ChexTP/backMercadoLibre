import Product from '../models/product.model.js'
import User from '../models/user.model.js'

export const createProduct = async (req,res) =>{
    const {
        name,
        description,
        price,
    }=req.body
    // console.log(name,description,price);
    const image = req.file ? req.file.path : null;
    try {    
        const newProduct = new Product({
            name,
            description,
            price,
            image
        })
        const productSaved = await newProduct.save()
        res.json({
            id:productSaved._id,
            name:productSaved.name,
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
        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred fetching the products', error: error.message });
    }
}

export const getProductByUser = async (req,res) =>{
    const {idUSer} = req.body
    try {
        const productFound = await Product.find({user:idUSer}).populate('user')
        if(!productFound)return res.status(404).json({message:'Product not found'})
        
        res.status(200).json(productFound)

    } catch (error) {
        res.status(500).json({ message: 'An error occurred fetching the product by user', error: error.message });
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
        user.product.push(idProduct)
        user.save()
        const userUpdate = await User.findById(idUser).populate('product')
        res.status(200).json(userUpdate)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred buy the product for the user', error: error.message });
    }
}

