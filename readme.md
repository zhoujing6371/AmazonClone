# Amazon Clone full stack ecommerce website
# Write By Jing Zhou
## Amazon Clone full stack ecommerce  website based on Angular 7.0 + Express + MongoDB

### To run the client side, get into the server directory, type in: ng serve 

1, used bootstrap for style.<br>
2, used used stripe for payments.<br>
3, wrote AuthGuardService which implemented CanActivate by injecting ActivatedRouteSnapshot and RouterStateSnapshot. Firstly, Check if the user is logged in. If logged in, Allow access to the profile and block access to route the register page; else, block access to routes the user profile and allow access to the register page.<br>
4, wrote RestApiService service by injecting HttpClient and implement methods of get(), post() ; implement getHeader() by get token from localstorage to HttpHeader().<br>
5, wrote DataService by injecting Router and RestApiService, implemented method of getProfile(), getCart(), addToCart(), removeFromCart(), clearCart().<br>
6, built many components, including AddressComponent, CartComponent, CategoriesComponent, CategoryComponent, HomeComponent, LoginComponent, MessageCommponent, MyProductsComponent, OrdersComponent, OrderComponent, PostProductComponent, ProductComponent, ProfileComponent, RegistrationComponent, SearchComponent and SettingComponent.<br>



### To run the server side, type in:  nodemon server

1, used algolia for search.<br>
2, used aws to store seller information and product information.<br>
3, used stripe for payments.<br>
4, use multer and multer-s3 to upload image to aws.<br>
5, built many mongoose Schema files in the models directory. Including category, image, order, product, review,user.<br>
6, Under the middlewares directory, there is a file check-jwt. In this file, there is a middleware function  checking whether there is a web token and decode this token.<br>
7, Under the routes directory, there are four files, account, main, product-search, seller.<br>




