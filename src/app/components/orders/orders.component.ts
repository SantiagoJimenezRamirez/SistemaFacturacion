import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { ProductsMenuComponent } from "../products-menu/products-menu.component";
import { CategoriesService } from '../../services/categories.service';
import { CommonModule, formatNumber } from '@angular/common';
import { FoodService } from '../../services/food.service';
import { CardProductComponent } from "../../subComponents/card-product/card-product.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PdfService } from '../../services/pdf-service.service';
import { NumberFormatterService } from '../../services/number-formatter.service';
import Swal from 'sweetalert2';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FormsModule, ProductsMenuComponent, CommonModule, CardProductComponent, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private imageData: string | undefined;
  showform = false
  categories: any = [];
  allData: any[] = [];
  filteredProducts: any[] = [];
  isVisible = false;
  nameSelect = ''
  selectedProducts: any[] = [];
  productForm!: FormGroup;
  ordersAfterDiscount:any[] = [];
  selected :any[] = [];
  totalPrice : number = 0;
  editingIndex: number | null = null;

  constructor(private _categoryService:CategoriesService,
    private _productService: FoodService, 
    private fb: FormBuilder,
  private pdfService: PdfService,
  private ordersService: OrdersService,
  private numberFormatter: NumberFormatterService){
  }

  ngOnInit(): void {
    this.loadImage();
    this.productForm = this.fb.group({
      units: [1],
      discount: [''],
      comment: ['']
    });
    this._categoryService.getCategories().subscribe(
      response => {
        this.categories = response;
        console.log(this.categories)
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
    this._productService.getFood().subscribe(
      response => {
        this.allData = response;
        console.log(this.allData)
      },
      error =>{
        
      }
    )
  }
  bringProducts(name: string) {
    this.filteredProducts = this.allData.filter(product => product.type === name);
  }

  submitOrders() {
    const order = {
      customerName : '',
      products: this.selected,
      waiterName: localStorage.getItem('name'),
      totalPrice : this.totalPrice,
      status: false,
    }
    console.log('ORDEN: ',order)
    this.ordersService.newOrder(order).subscribe(
      response => {
        console.log('Ordenes enviadas exitosamente', response);
        this.selected = [];
        Swal.fire({
          title: 'PRODUCTO',
          text: 'Tu comanda ha sido enviada a la cocina',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ACEPTAR',
        });
      },
      error => {
        console.error('Error al enviar las órdenes', error);
        Swal.fire({
          title: 'PRODUCTO',
          text: 'Tu comanda ha presentado un error',
          icon: 'error',
          confirmButtonColor: '#c1121f',
          confirmButtonText: 'ACEPTAR',
        });
      }
    );
  }

    // Función para eliminar un producto del array selected
    deleteProduct(index: number) {
      this.selected.splice(index, 1);
    }

    editProduct(index: number) {
      this.isVisible = true
      const productToEdit = this.selected[index];
      this.productForm.patchValue({
        discount: productToEdit.discount,
        units: productToEdit.units, // Asegúrate de usar el nombre correcto del campo
        comment: productToEdit.comment
      });
      this.editingIndex = index; // Guardar el índice del producto que se está editando
      console.log('Producto a editar:', productToEdit);
    }
    

    // Función para enviar los datos del formulario
discountForm() {
  const formData = this.productForm.value;

  // Obtener el último producto seleccionado para usar su precio
  const lastProduct = this.selectedProducts[this.selectedProducts.length - 1];

  // Convertir los valores a números para evitar problemas de NaN
  const price = parseFloat(lastProduct.price);
  const units = parseFloat(formData.units);
  const discount = parseFloat(formData.discount) || 0; // Default to 0 if NaN

  // Verificar que los valores sean números válidos
  if (isNaN(price) || isNaN(units)) {
    console.error('Error: El precio o las unidades no son números válidos.');
    return;
  }

  // Calcular el precio total basado en unidades y precio unitario, y aplicar descuento
  const productSelected = {
    nameProduct: lastProduct.name,
    price: (price * units) - discount,
    units: units,
    comment: formData.comment,
  };

  if (this.editingIndex !== null) {
    // Actualizar el producto existente en lugar de agregar uno nuevo
    this.selected[this.editingIndex] = productSelected;
    console.log('Producto actualizado:', productSelected);
  } else {
    // Agregar el nuevo producto a la lista si no se está editando
    this.selected.push(productSelected);
    console.log('Nuevo producto agregado:', productSelected);
  }

  // Actualizar el precio total
  this.totalPrice = this.totalPrice + productSelected.price;

  // Resetear el formulario y la variable de edición
  this.productForm.reset();
  this.productForm.patchValue({
    units: 1
  });
  this.isVisible = false;

  // Limpiar el índice de edición después de guardar
  this.editingIndex = null;
}


  onProductSelected(product: any) {
    console.log('click en: ', product)
    const exists = this.selectedProducts.some(item => item.id === product.id);

    this.isVisible = true
    if (!exists) {
      this.selectedProducts.push(product); // Agregar el producto al array si no está ya en la lista
      console.log(this.selectedProducts)
    }
  }

  private loadImage() {
    const imagePath = './ElEstablo.jpg';
    const reader = new FileReader();
    const img = new Image();

    img.src = imagePath;
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      this.imageData = canvas.toDataURL('image/jpeg');
    };
  }

  generateAndPrintReceipt() {
    if (!this.imageData) {
      console.error('Imagen no cargada');
      return;
    }

    let priceTotal = 0;
    const listItems: string[] = [];
    
    this.ordersAfterDiscount.forEach(order => {
      // Calcula el precio total por producto
      const totalPrice = Number(order.unitis) * Number(order.price);
      console.log('TOTAL PRICE: ', totalPrice)

      const itemText = `${order.unitis}x ${order.nameProduct} - $${this.numberFormatter.formatNumber(Number(totalPrice.toFixed()))}`;
      console.log("Item text: ",itemText)
      
      listItems.push(itemText);

      priceTotal += totalPrice;
    });

    const paragraph1 = 'Gracias por su visita. Su satisfacción es nuestra prioridad.';
    const paragraph2 = `Total ${this.numberFormatter.formatNumber(priceTotal)}`;

    this.pdfService.generateReceipt(this.imageData, paragraph1, listItems, paragraph2);

    Swal.fire({
      title: 'FELICIDADES',
      text: 'PDF GENERADO CON ÉXITO',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ACEPTAR',
    });
  }
  getFormattedCount(count:any): string {
    return count.toLocaleString();
}

  productSelected(){
    return this.nameSelect;
  }
}
