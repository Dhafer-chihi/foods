import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/models/Cart';
import { Order } from 'src/app/shared/models/Order';
import { CartPageComponent } from '../cart-page/cart-page.component';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm !: FormGroup;
  constructor(carteService: CartService, private formBuilder: FormBuilder,
    private userService: UserService, private toast: NgToastService,
    private orderServices: OrderService, private router: Router) {
    const cart = carteService.getCart();
    this.order.items = cart.item;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    })
  }
  get fc() {
    return this.checkoutForm.controls;
  }
  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toast.warning({ detail: 'Please fill the inputs', summary: 'Invalid Inputs' });
      return;
    }

    if (!this.order.addressLatLng) {
      this.toast.warning({ detail: 'Please select your location in the map', summary: 'Location' });
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderServices.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (errorResponse) => {
        this.toast.error(errorResponse.error);
      }
    });
  }
}
