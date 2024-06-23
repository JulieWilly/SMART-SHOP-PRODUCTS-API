import { Router } from 'express'
import {getAllProducts, getSingleProduct, createNewProduct, updateSingleProduct, deleteProduct} from '../controllers/users.controllers.js'
// import { validateUpdateDetails } from '../middlewares/users.middlewares.js'

const router = Router();

router.get('/', getAllProducts)

.get('/:product_id', getSingleProduct )

.post("/",  createNewProduct )

.patch('/:product_id', updateSingleProduct )

.delete("/:product_id", deleteProduct)

export default router;