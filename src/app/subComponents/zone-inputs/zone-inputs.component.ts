import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zone-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './zone-inputs.component.html',
  styleUrls: ['./zone-inputs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZoneInputsComponent),
      multi: true
    }
  ]
})
export class ZoneInputsComponent implements ControlValueAccessor {
  @Input() labelText: string = 'Texto';
  @Input() typeInput: string = 'text';
  @Input() messageEmergent:string = '';
  @Input() placeHolder: string = '';
  @Input() pathImage: string = '../../../assets/icons/User.svg';

  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};
  showError: boolean = false; // Controla la visualización del mensaje de error

  ngOnInit(): void {
    this.startValidationTimer();
  }

  startValidationTimer(): void {
    setTimeout(() => {
      if (!this.value) {
        this.showError = true;
      }
    }, 5000); // 5000 ms = 5 segundos
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // opcional, si quieres manejar el estado deshabilitado
  }

  onBlur(event: any): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue) {
      this.showError = false; // Oculta el mensaje de error si el campo se llena
    }
    this.onTouched();
    this.onChange(event.target.value);
  }
}
