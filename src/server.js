import express, { Router } from "express"
import productsRouter from "./router/products.routes.js"
import cartRouter from "./router/cart.routes.js"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

app.listen(8080, ()=>{
    console.log("escuchando")
})

