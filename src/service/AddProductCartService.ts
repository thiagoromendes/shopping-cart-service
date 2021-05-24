import { getRepository } from "typeorm";
import { ShoppingCart } from "../model/ShoppingCart";
import { Product } from '../model/Product';

class AddProductCartService{

    public async execute(shoppingCartId:string, {productId, price, quantity}:Product): Promise<ShoppingCart | {}>{

        const shoppingCartRepository = getRepository(ShoppingCart);

        let shoppingCart = await shoppingCartRepository.findOne(shoppingCartId, { relations: ["products"] });

        if(!shoppingCart){
            return {
                message: `Shopping Cart id ${shoppingCartId} not found`
            }
        }

        function addNewProduct(shoppingCart:ShoppingCart){
            const product = new Product()
            product.productId = productId
            product.price = price
            product.quantity = quantity
            shoppingCart.products.push(product)
        }
        
        const exists = shoppingCart.products.find(product => product.productId === productId)

        shoppingCart.products.length === 0 || !exists ? 
            addNewProduct(shoppingCart) :
            shoppingCart.products.map(product => {
                if(product.productId === productId){
                    product.quantity += quantity
                }                     
            })
        
        shoppingCart.totalQuantity += quantity
        shoppingCart.totalPrice += (price * quantity)
        

        await shoppingCartRepository.save(shoppingCart)

        return shoppingCart;
    }
}

export {AddProductCartService}