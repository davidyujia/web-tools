import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-sha-encode',
    imports: [FormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, MatSelectModule],
    templateUrl: './sha-encode.component.html',
    styleUrl: './sha-encode.component.scss'
})
export class ShaEncodeComponent {
  algorithm = 'SHA-512';

  decodedTitle?: string = 'Original Value';

  decodedValue = '';
  async onDecodedValueChange(s: string) {
    const data = new TextEncoder().encode(s);
    const hash = await window.crypto.subtle.digest(this.algorithm, data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    this.encodedValue = hashHex;
  }

  encodedTitle?: string = 'Encoded Value';
  encodedValue = '';

  ngOnInit() {
    this.onDecodedValueChange(this.decodedValue);
  }
}
