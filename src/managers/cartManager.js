import fs from "fs"
import { ProductCollection } from "./productManager.js"
const productManager = new ProductCollection()
export class CartCollection{
    constructor(){
        this.cartList = []
        this.ruta = "./src/managers/cartList.json"
    }
    async createCart(){
        try {
            const newCart =
            {
                id: this.cartList.length + 1,
                products: []
            }
            console.log(newCart)
            this.cartList.push(newCart)
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.cartList))
            return newCart
        } catch (error) {
            console.log(error)
        }
    }
    async getCart(){
        try {
            const carts = await fs.promises.readFile(this.ruta, "utf-8")
            const parsear = JSON.parse(carts)
            this.cartList = parsear || []
        } catch (error) {
            
        }
    }
    async getCartById(id){
        try {
            await this.getCart()
            const cart = this.cartList.find((carrito)=> carrito.id === Number(id))
            if(!cart) return console.log(`No hay un carro con el id ${id}`)
                return cart
        } catch (error) {
            console.log(error)
        }
    }
    async addToCart(cid, pid){
       try {
            await this.getCart()
            //const producto = await productManager.getProductById(pid)
            //const idProd = producto.id
            const carrito = await this.getCartById(cid)
            const carro = carrito.products.find((prod)=>prod.id === pid)
            if(!carro){
                carrito.products.push({id:pid, quantity:1})
            } else {
                carro.quantity++
            }
            this.cartList.push(carrito)
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.cartList))
            return carrito
       } catch (error) {
            console.log(error)
       }
    }
}