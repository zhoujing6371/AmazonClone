import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: any;
  category: any;
  page = 1;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private rest: RestApiService,
  ) {}

  ngOnInit() { // run on everytime the page is visited
    this.activatedRoute.params.subscribe(res => { // check if the route parameter has changed or not.
      // if permantent changed, the category id will be updated and getProducts() will be called.
      this.categoryId = res['id'];
      this.getProducts();
    });
  }

  get lower() {
    return 5 * (this.page - 1) + 1;
  }

  get upper() {
    return Math.min(5 * this.page, this.category.totalProducts);
  }

  async getProducts(event?: any) { // event is the optional parameter
    if (event) {
      this.category = null;
    }
    try {
      const data = await this.rest.get(
        `http://localhost:5555/api/categories/${this.categoryId}?page=${this
          .page - 1}`,
      );
      data['success']
        ? (this.category = data)
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
