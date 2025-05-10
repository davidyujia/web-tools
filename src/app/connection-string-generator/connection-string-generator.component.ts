import { Component, OnInit, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connection-string-generator',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    ClipboardModule,
    MatSnackBarModule
  ],
  templateUrl: './connection-string-generator.component.html',
  styleUrl: './connection-string-generator.component.scss',
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1500, verticalPosition: 'top' } }
  ]
})
export class ConnectionStringGeneratorComponent implements OnInit, DoCheck {
  dbType: string = 'mssql';
  host: string = '';
  port: number | null = null;
  database: string = '';
  username: string = '';
  password: string = '';
  connectionString: string = '';
  jsonString: string = '';
  jsonConnectionString: string = '';

  // 連線字串 key-value 配對陣列
  keyValues: { key: string; value: string }[] = [
    { key: 'Server', value: '' },
    { key: 'Database', value: '' },
    { key: 'User Id', value: '' },
    { key: 'Password', value: '' }
  ];

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  addKeyValue() {
    this.keyValues.push({ key: '', value: '' });
  }

  removeKeyValue(index: number) {
    if (this.keyValues.length > 1) {
      this.keyValues.splice(index, 1);
    }
  }

  // 只要 keyValues 有變動就自動產生連線字串
  ngOnInit() {
    this.generateConnectionString();
  }

  ngDoCheck() {
    this.generateConnectionString();
  }

  // 將所有特殊字元進行 escape，符合 connection string 規格
  /**
   * 將 value 中所有常見特殊字元 (分號 ;、等號 =、空白、單引號 '、雙引號 "、反斜線 \\ 等) 進行處理：
   * 只要包含上述任一字元，就用雙引號包裹，並將內部雙引號以兩個雙引號取代。
   * 這是為了防止 connection string 格式錯誤或潛在安全問題。
   */
  private escapeValue(value: string): string {
    if (value == null) return '';
    // 檢查是否包含特殊字元
    if (/[;=\s'"\\]/.test(value)) {
      // 將內部雙引號轉成兩個雙引號
      return '"' + value.replace(/"/g, '""') + '"';
    }
    return value;
  }

  generateConnectionString() {
    const filtered = this.keyValues.filter(kv => kv.key.trim() !== '');
    if (filtered.length > 0) {
      this.connectionString = filtered.map(kv => `${kv.key}=${this.escapeValue(kv.value)}`).join(';') + ';';
    } else {
      this.connectionString = '';
    }
    // 產生 key-value JSON 格式
    const obj: Record<string, string> = {};
    filtered.forEach(kv => {
      obj[kv.key] = kv.value;
    });
    this.jsonString = JSON.stringify(obj, null, 2);
    // 產生 { "ConnectingStrings": { "Default": "..." } } 格式
    this.jsonConnectionString = JSON.stringify({
      ConnectingStrings: {
        Default: this.connectionString
      }
    }, null, 2);
  }

  copyToClipboard(text?: string) {
    const value = text ?? this.connectionString;
    if (this.clipboard.copy(value)) {
      this.snackBar.open('Copied to clipboard', 'Close', {
        duration: 1500,
        verticalPosition: 'bottom', // Show at the bottom of the screen
        panelClass: ['copy-success-snackbar']
      });
    }
  }
}
