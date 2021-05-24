import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { Product } from './Product';

@Entity('shopping_cart')
class ShoppingCart{
    
    constructor(){
        
        if(!this.shoppingCartId){
            this.shoppingCartId = uuid()
        }
    }

    @PrimaryColumn()
    readonly shoppingCartId: string;

    @Column()
    userId: string;

    @Column()
    totalPrice: number;

    @Column()
    totalQuantity: number;

    @ManyToMany(type => Product, product => product.shoppingCarts, {
        cascade: true
    })
    @JoinTable()
    products: Product[]

}

export {ShoppingCart}