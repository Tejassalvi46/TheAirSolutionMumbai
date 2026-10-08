import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brand-product.html',
  styleUrls: ['./brand-product.css']
})
export class BrandProductComponent implements OnInit {
  selectedBrand: string | null = null;

  constructor(private route: ActivatedRoute) {}

 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.selectedBrand = params.get('id'); // matches ':id' in route
  });
}
}