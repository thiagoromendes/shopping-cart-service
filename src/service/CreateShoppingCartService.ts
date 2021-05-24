import { getRepository } from "typeorm"
import { ShoppingCart } from "../model/ShoppingCart"

interface ShoppingCartBody{
    userId: string;
    totalPrice: number;
    totalQuantity: number;
}

class CreateShoppingCartService{

    public async execute({userId,totalPrice,totalQuantity}:ShoppingCartBody):Promise<ShoppingCartBody | {}>{

        const shoppingCartRepository = getRepository(ShoppingCart);    

        const shoppingCart = shoppingCartRepository.create({
            userId,
            totalPrice,
            totalQuantity
        })

        await shoppingCartRepository.save(shoppingCart);

        return shoppingCart;
    }
}

export {CreateShoppingCartService}