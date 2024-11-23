import { Router } from "express";
import { ProductCollection } from "../managers/productManager.js";

const productManager = new ProductCollection()
const router = Router()

router.get("/", async (req,res)=>{
    const {limit} = req.query
    try{
        const products = await productManager.getProducts(limit)
        res.status(200).send(products)
    }
    catch(error){
        console.log(error)
    }
})

router.get("/:pid", async (req,res)=>{
    const {pid} = req.params
    try{
        const products = await productManager.getProductById(pid)
        res.status(200).send(products)
    }
    catch(error){
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    const body = req.body
    try {
        const product = await productManager.addProduct(body)
        res.send(product)
    } catch (error) {
        console.log(error)
    }
})

router.put("/:pid", async (req,res)=>{
    const {pid} = req.params
    const body = req.body
    try{
        const products = await productManager.updateProduct(pid, body)
        res.send(products)
    }
    catch(error){
        console.log(error)
    }
})

router.delete("/:pid", async (req,res)=>{
    const {pid} = req.params
    try{
        const products = await productManager.deleteProduct(pid)
        res.status(200).send(products)
    }
    catch(error){
        console.log(error)
    }
})

export default router