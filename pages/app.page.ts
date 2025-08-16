import { Page } from "@playwright/test";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";
import { AccountPage } from "./account.page";
import { productDetailsPage } from "./productDetails.page";

export class ApplicationPage{
    private readonly page:Page;
    
    readonly home:HomePage;
    readonly login:LoginPage;
    readonly account: AccountPage;
    readonly productDetailsPage: productDetailsPage;

    constructor(page:Page){
        this.page=page;
        this.home=new HomePage(this.page);
        this.login= new LoginPage(this.page);
        this.account=new AccountPage(this.page);
        this.productDetailsPage = new productDetailsPage(this.page)
    }
}