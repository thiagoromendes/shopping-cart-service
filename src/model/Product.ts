import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import {v4 as uuid} from 'uuid'

import './ShoppingCart';
import { ShoppingCart } from './ShoppingCart';

@Entity()
class Product{

    constructor(){
        
        if(!this.id){
            this.id = uuid()
        }
    }

    @PrimaryColumn()
    readonly id: string

    @Column()
    productId: string

    @Column()
    price: number

    @Column()
    quantity: number

    @ManyToMany(type => ShoppingCart, shoppingCart => shoppingCart.products)
    shoppingCarts: ShoppingCart[]

}

export {Product}