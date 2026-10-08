import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { ProductList } from './product-list/product-list';
import { ProductDetails } from './product-details/product-details';
import { BrandComponent } from './brand/brand';
import { BrandProductComponent } from './brand-product/brand-product';
import { ContactUsComponent } from './contact-us/contact-us';
import { WhychooseUs } from './whychoose-us/whychoose-us';
import { ServicesComponent } from './services/services';
import { Projects } from './projects/projects';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route redirect
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'product-list', component: ProductList },
    { path: 'product-details/:id', component: ProductDetails },
    { path: 'brand', component: BrandComponent },
    { path: 'brand-product/:id', component:  BrandProductComponent},
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'whychoose-us', component: WhychooseUs },
    { path: 'Service', component: ServicesComponent },
    { path: 'projects', component: Projects },
];
