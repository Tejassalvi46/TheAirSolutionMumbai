import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: any = null;

  productsDatabase: { [key: number]: any } = {
   1: { 
    id: 1, 
    name: "Split AC", 
    img: "assets/images/split-ac.png", 
    price: "$499", 
    desc: "Experience whisper-quiet, energy-efficient cooling with advanced inverter technology. Our Split AC delivers pure, bacteria-free air, smart climate control, and sleek design—transforming your space into a perfect comfort zone." 
  },
  2: { 
    id: 2, 
    name: "Window AC", 
    img: "/images/window-ac.jpg", 
    price: "$349", 
    desc: "Powerful cooling meets smart savings. Our Window AC features turbo chill, anti-bacterial filtration, and whisper-quiet operation—delivering refreshing comfort with unmatched durability and style." 
  },
  3: { 
    id: 3, 
    name: "Cassette AC", 
    img: "assets/images/cassette-ac.png", 
    price: "$599", 
    desc: "Sleek ceiling-mounted design with 360° airflow. Our Cassette AC delivers powerful, uniform cooling for large spaces—ultra-quiet, energy-efficient, and perfect for offices, showrooms, and modern interiors." 
  },
  4: { 
    id: 4, 
    name: "One Way Cassette", 
    img: "assets/images/One Way Cassette.png", 
    price: "$599", 
    desc: "Ultra-slim ceiling-mounted design engineered for precise single-directional airflow. Ideal for compact spaces and shallow ceiling voids—delivering silent, efficient, and targeted cooling for hotel rooms and modern homes." 
  },
  5: { 
    id: 5, 
    name: "Ductable AC", 
    img: "assets/images/ductable-ac.jpg", 
    price: "$429", 
    desc: "Hidden ceiling-mounted cooling for entire spaces. Our Ductable AC delivers powerful, uniform airflow through concealed ducts—perfect for homes, offices, and commercial projects seeking seamless, quiet, and centralized comfort." 
  },
  6: { 
    id: 6, 
    name: "Tower AC", 
    img: "assets/images/Tower-AC.png", 
    price: "$799", 
    desc: "Sleek, tall, and space-saving design with powerful airflow. Our Tower AC delivers rapid, even cooling with advanced filtration and whisper-quiet operation—perfect for modern homes, offices, and showrooms demanding elegance." 
  },
  7: { 
    id: 7, 
    name: "Multi AC", 
    img: "assets/images/multi-ac.png", 
    price: "$649", 
    desc: "Save space and energy with our Multi AC. One outdoor unit connects multiple indoor units, offering individual room control, powerful cooling, and smart efficiency—perfect for large homes and commercial spaces." 
  },
  8: { 
    id: 8, 
    name: "VRF / VRV", 
    img: "assets/images/VRF-ac.png", 
    price: "$529", 
    desc: "Premium commercial climate control redefined. Our VRF/VRV system offers simultaneous cooling and heating, superior energy savings, and scalable design—perfect for hotels, offices, and luxury residential towers." 
  },
  9: { 
    id: 9, 
    name: "Deep Freezers", 
    img: "assets/images/deep-freez.png", 
    price: "$529", 
    desc: "Heavy-duty low-temperature preservation engineered for ultimate freshness retention. Our Deep Freezer features ultra-fast freezing, high-density insulation, and extended power-cut cooling backup—perfect for commercial and household cold storage." 
  }
};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const productId = Number(idParam);
        this.product = this.productsDatabase[productId] || null;
      }
    });
  }

  addToCart(): void {
    alert('Product added to cart successfully!');
  }
}