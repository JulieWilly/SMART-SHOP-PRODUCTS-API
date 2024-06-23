import express from 'express'
import userRouter from './router/users.router.js'

const shop = express();

shop.use(express.json())
shop.use("/products", userRouter)

shop.listen(3000, () => {
    console.log("Runnig on port 3000")
})
