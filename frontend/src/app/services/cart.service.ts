import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }
  addToCart(food: Food): void {
    let cartItem = this.cart.item.find(item => item.food.id == food.id)
    if (cartItem)
      return;
    this.cart.item.push(new CartItem(food));
    this.setCartTolocalStorage();
  }
  removeFromCart(foodId: number): void {
    this.cart.item = this.cart.item.filter(item => item.food.id != foodId);
    this.setCartTolocalStorage();

  }
  changeQuantity(foodId: number, quantity: number) {
    let cartItem = this.cart.item.find(item => item.food.id == foodId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartTolocalStorage();
  }
  clearCart() {
    this.cart = new Cart();
    this.setCartTolocalStorage();

  }
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartTolocalStorage(): void {
    this.cart.totalPrice = this.cart.item.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.item.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();

  }
}
