import { getRepository } from "typeorm";
import { ShoppingCart } from "../model/ShoppingCart";
import { Product } from '../model/Product';

class RmProductCartService{

    public async execute(shoppingCartId:string, {productId, price, quantity}:Product): Promise<ShoppingCart | {}>{

        const shoppingCartRepository = getRepository(ShoppingCart);

        let shoppingCart = await shoppingCartRepository.findOne(shoppingCartId, { relations: ["products"] });

        if(!shoppingCart){
            return {
                message: `Shopping Cart id ${shoppingCartId} not found`
            }
        }
        
        const exists = shoppingCart.products.find(product => product.productId === productId)

        if(!exists) {
            return {
                message:`Product id ${productId} not found`
            }
        }

        shoppingCart.products.map(product => {
            if(product.productId === productId){
                product.quantity -= quantity
            } 
        })

        const updateListProducts = shoppingCart.products.filter(product => product.quantity !== 0)

        shoppingCart.products = [...updateListProducts]
        shoppingCart.totalQuantity -= quantity
        shoppingCart.totalPrice -= (price * quantity)     

        await shoppingCartRepository.save(shoppingCart)

        return shoppingCart;
    }
}

export {RmProductCartService}