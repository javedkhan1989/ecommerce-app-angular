import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Register } from './register/register';
import { ProductList } from './product-list/product-list';
import { ProductDetails } from './product-details/product-details';
import { AddProduct } from './add-product/add-product';
import { CartComponent } from './cart/cart';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'product-list',component:ProductList},
    { path: 'product/:id', component: ProductDetails },
    {path:'register',component:Register},
    {path:'home',component:Home},
    { path: 'add-product', component: AddProduct },
    { path: 'cart', component: CartComponent },


    {path:'',redirectTo:'login',pathMatch:'full'}    
];
