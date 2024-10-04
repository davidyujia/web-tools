import { Component } from '@angular/core';
import { EncodeDecodeInputComponent } from '../partial/encode-decode-input/encode-decode-input.component';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-base64-encode-decode',
  standalone: true,
  imports: [EncodeDecodeInputComponent],
  templateUrl: './base64-encode-decode.component.html',
  styleUrl: './base64-encode-decode.component.scss'
})
export class Base64EncodeDecodeComponent {
  onDecodedValueChange = (s: string) => Base64.encode(s);
  onEncodedValueChange = (s: string) => Base64.decode(s);
}
