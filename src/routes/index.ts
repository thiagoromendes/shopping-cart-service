import {Router} from 'express';

import {ShoppingCartController} from '../controller/ShoppingCartController';

const routes = Router();

const shoppingController = new ShoppingCartController();

routes.post('/', shoppingController.create);
routes.get('/:id', shoppingController.index);
routes.put('/addproduct/:id', shoppingController.update);
routes.put('/rmproduct/:id', shoppingController.update);

export default routes;