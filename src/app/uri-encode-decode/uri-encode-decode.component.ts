import { Component } from '@angular/core';
import { EncodeDecodeInputComponent } from "../partial/encode-decode-input/encode-decode-input.component";

@Component({
  selector: 'app-uri-encode-decode',
  standalone: true,
  imports: [EncodeDecodeInputComponent],
  templateUrl: './uri-encode-decode.component.html',
  styleUrl: './uri-encode-decode.component.scss'
})
export class UriEncodeDecodeComponent {
  onDecodedValueChange = encodeURI;
  onEncodedValueChange = decodeURI;
}
