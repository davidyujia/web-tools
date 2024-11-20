import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-encode-decode-input',
    imports: [FormsModule, MatFormFieldModule, MatInputModule, TextFieldModule],
    templateUrl: './encode-decode-input.component.html',
    styleUrl: './encode-decode-input.component.scss'
})
export class EncodeDecodeInputComponent {

  @Input() decodedTitle?: string = 'Original Value';
  @Input() onDecodedValueChange?: (s: string) => string;

  decodedValue = '';
  onDecodedValueChangeIn(s: string) {
    this.encodedValue = this.onDecodedValueChange ? this.onDecodedValueChange(s) : this.decodedValue;
  }


  @Input() encodedTitle?: string = 'Encoded Value';
  @Input() onEncodedValueChange?: (s: string) => string;

  encodedValue = '';
  onEncodedValueChangeIn(s: string) {
    this.decodedValue = this.onEncodedValueChange ? this.onEncodedValueChange(s) : this.encodedValue;
  }

}
