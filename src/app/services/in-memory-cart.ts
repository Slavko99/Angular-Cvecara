import { InMemoryDbService } from "angular-in-memory-web-api";
import { Product } from "../models/shoppingCart";




export class InMemoryCart implements InMemoryDbService{
    createDb() {
        const cart: Product[] = [
            
        ];
        return { cart };
    }
    
    
}