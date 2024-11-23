import { error } from "console"
import fs from "fs"
export class ProductCollection{
    constructor(){
        this.products = []
        this.ruta = "./src/managers/productList.json"
    }
    async addProduct(product){
        try{
            await this.getProducts()

        const{ title, description, price, thumbnail, code, stock, category, status} = product

        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status
        }
        
        const productoExiste = this.products.find((product)=>product.code === code)
        if(productoExiste)  throw new Error ("Producto existe con ese codigo")

        
        const validateProperties = Object.values(newProduct)
        if (validateProperties.includes(undefined)) throw new Error ("Asegurate de llenar todos los campos")
        this.products.push(newProduct)
        await fs.promises.writeFile(this.ruta, JSON.stringify(this.products))
        return newProduct     
        }
        catch(error){
            console.log(error)
        }
        
    }
    async getProducts(limit){
        try{
            const productos = await fs.promises.readFile(this.ruta, "utf-8")
            const parsear = JSON.parse(productos)
            this.products = parsear || []
            if (!limit) return this.products
            return this.products.slice(0, limit)
        }
        catch(error){
            console.log(error)
        }
    }
    async getProductById(id){
        await this.getProducts()
        const product = this.products.find((product)=> product.id === (Number(id)))
        if(!product) return console.log(`No hay un producto con el id ${id}`)
            return product
    }

    async updateProduct(id, data){
        await this.getProductById(id)
        const index = this.products.findIndex((product.id === id))
        this.products[index] = {
            ...this.products[index],
            ...data,
        }
        await fs.promises.writeFile(this.ruta, JSON.stringify(this.products))
        return this.products[index]
    }

    async deleteProduct(id){
        await this.getProductById(id)
        this.products = this.products.filter((prod)=> prod.id !== id)
        await fs.promises.writeFile(this.ruta, this.products)
        return `Producto con el id ${id}: eliminado`

    }
}

