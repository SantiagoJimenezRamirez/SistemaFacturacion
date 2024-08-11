import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-menu-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './menu-table.component.html',
  styleUrl: './menu-table.component.scss',
  providers: [FoodService]
})
export class MenuTableComponent implements OnInit {
  @Output() editForm = new EventEmitter<string>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'type', 'price', 'description', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);
  categories: string[] = [];
  allData: any[] = [];


  constructor(private _productService: FoodService) {}

  ngOnInit(): void {
    this._productService.getFood().subscribe(
      (response: any[]) => {
        this.allData = response;
        this.categories = [...new Set(response.map(item => item.type))]; // Extrae categorías únicas
        this.dataSource.data = this.allData;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener los datos del menú:', error);
      }
    );
  }

  onCategoryChange(category: string): void {
    if (category) {
      this.dataSource.data = this.allData.filter(item => item.type === category);
    } else {
      this.dataSource.data = this.allData; // Muestra todos los datos si no hay filtro
    }
  }

  editProduct($event: MouseEvent) {
    this.editForm.emit('edit'); // Emitir 'edit' al presionar el botón
  }

  deleteProduct(product: any) {
    console.log('Eliminando producto:', product);
  }
}
