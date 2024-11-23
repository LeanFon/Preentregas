import { Router } from "express";
import { CartCollection } from "../managers/cartManager.js";

const cartManager = new CartCollection()
const router = Router()

router.post("/", async (req, res) => {
    try {
        const carro = await cartManager.createCart()
        res.send(carro)
    } catch (error) {
        console.log(error)
    }
})

router.get("/:cid", async (req,res) => {
    const {cid} = req.params
    try {
        const carro = await cartManager.getCartById(cid)
        if(carro === undefined) res.status(404).send(`No se ha encontrado un carro con el id ${cid}`)
        res.send(carro)
    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/products/:pid", async (req,res) => {
    const {cid} = req.params
    const {pid} = req.params
    try {
        const carro = await cartManager.addToCart(cid, pid)
        res.send(carro)
    } catch (error) {
        console.log(error)
    }
})

export default router