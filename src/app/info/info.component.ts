import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-info',
  imports: [DatePipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  version = environment.version;
  info: any;
  browser: any;
  ngOnInit() {
    this.info = JSON.stringify(this.getBrowserInfo());
    this.browser = JSON.stringify(this.getBrowserInfo2());
  }

  getBrowserInfo() {

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "OPR" or after "Version"
    if ((verOffset = nAgt.indexOf("OPR")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 4);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MS Edge, the true version is after "Edg" in userAgent
    else if ((verOffset = nAgt.indexOf("Edg")) != -1) {
      browserName = "Microsoft Edge";
      fullVersion = nAgt.substring(verOffset + 4);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    var info = {
      name: browserName,
      version: fullVersion,
      majorVersion: majorVersion,
      appName: navigator.appName,
      userAgent: navigator.userAgent
    };

    return info;
  }

  getBrowserInfo2() {
    return {
      // 螢幕尺寸（可能不準確）
      screenHeight: screen.height,
      screenWidth: screen.width,

      // 瀏覽器內網頁可視尺寸（去除上面的網址列、右邊的選軸等）
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,

      // 瀏覽器整體尺寸（包含上面的網址列、右邊的選軸等）
      outerHeight: window.outerHeight,
      outerWidth: window.outerWidth,

      // 網頁尺寸（Document尺寸）
      pageHeight: document.documentElement.scrollHeight,
      pageWidth: document.documentElement.scrollWidth,

      // 瀏覽器時區，例如：Asia/Taipei
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      // 瀏覽器時區，例如：8（代表是+8時區）
      timeOffset: (-(new Date().getTimezoneOffset()) / 60),
      // 瀏覽器語言，例如：zh-TW
      language: navigator.language,

      // 螢幕色彩深度
      colorDepth: screen.colorDepth,
      // 縮放比例，現在手機上常見的是3，代表3:1
      devicePixelRatio: window.devicePixelRatio
    }
  }
}
