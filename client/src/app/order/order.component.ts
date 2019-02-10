import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { RestApiService } from '../service/rest-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderId: any;
  order: any;

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => { // check if the route parameter has changed or not.
      // if permantent changed, the category id will be updated and getProducts() will be called.
      this.orderId = res['id'];
      this.rest.get(`http://localhost:5555/api/accounts/orders/${res['id']}`)
        .then(data => {
          data['success']
            ? (this.order = data['order'])
            : this.order.navigate(['/']);
        }).catch(error => this.data.error(error['message']));

    });
  }

  // this.activatedRoute.params.subscribe(res => {
  //   this.rest.get(`http://localhost:5555/api/accounts/orders/${res['id']}`)
  //     .then(data => {
  //       data['success']
  //         ? (this.order = data['order'])
  //         : this.order.navigate(['/']);
  //     }).catch(error => this.data.error(error['message']));
  // });

  // async getOrder(event?: any) { // event is the optional parameter
  //   if (event) {
  //     this.order = null;
  //   }
  //   try {
  //     const data = await this.rest.get(
  //       `http://localhost:5555/api/accounts/orders/${this.orderId}`,
  //     );
  //     data['success']
  //       ? (this.order = data)
  //       : this.data.error(data['message']);
  //   } catch (error) {
  //     this.data.error(error['message']);
  //   }
  // }


}
