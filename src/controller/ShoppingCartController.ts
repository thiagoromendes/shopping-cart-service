import { Request, Response } from "express";
import { AddProductCartService } from "../service/AddProductCartService";
import { CreateShoppingCartService } from "../service/CreateShoppingCartService";
import { GetShoppingCartService } from "../service/GetShoppingCartService";
import { RmProductCartService } from "../service/RmProductCartService";

class ShoppingCartController {

    async create(request:Request, response:Response) {

        const shoppingCartBody = request.body

        const createShoppingCart = new CreateShoppingCartService()

        const shoppingCart = await createShoppingCart.execute(shoppingCartBody)

        return response.json(shoppingCart);
    }

    async index(request:Request, response:Response) {

        const {id} = request.params

        const getShoppingCart = new GetShoppingCartService()

        const shoppingCart = await getShoppingCart.execute(id)

        return response.json(shoppingCart);
    }

    async update(request:Request, response:Response) {

        const {id} = request.params
        const productBody = request.body

        const url = request.url

        const [, action, ] = url.split('/')

        let shoppingCart

        action === 'addproduct' ? 
            shoppingCart = await new AddProductCartService().execute(id, productBody) :
            shoppingCart = await new RmProductCartService().execute(id, productBody)

        return response.json(shoppingCart)
    }
}

export {ShoppingCartController}