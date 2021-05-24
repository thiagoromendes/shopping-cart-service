import { getRepository } from "typeorm"
import { ShoppingCart } from "../model/ShoppingCart"


class GetShoppingCartService{

    public async execute(shoppingCartId:string): Promise<ShoppingCart | {}>{

        const shoppingCartRepository = getRepository(ShoppingCart);

        const shoppingCart = await shoppingCartRepository.findOne(shoppingCartId, { relations: ["products"] });

        if(!shoppingCart){
            return {
                message: `Shopping Cart id ${shoppingCartId} not found`
            }
        }

        return shoppingCart;
    }
}

export {GetShoppingCartService}