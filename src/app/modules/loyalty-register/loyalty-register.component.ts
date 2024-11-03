import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoyaltyRegisterService } from './services/loyalty-register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PointOfSaleService } from '../point-of-sale/service/point-of-sale.service';
import { PointOfSaleRS } from '../point-of-sale/models/point-of-sale-response-model';
import { ConfigOptionsPOS } from '../point-of-sale/models/config-options-point-of-sale-model';
import { RecordClient } from './models/record-client.model';
import { vapidKey } from '../../../enviroment/api-config/api.configuration';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Banner } from '../point-of-sale/models/banner-model';

@Component({
  selector: 'app-loyalty-register',
  templateUrl: './templates/loyalty-register.component.html',
  styleUrl: './styles/loyalty-register.component.scss'
})
export class LoyaltyRegisterComponent implements OnInit {

  protected registerForm: FormGroup;
  protected selectedPOS?: PointOfSaleRS;
  protected configOptionsPOS: ConfigOptionsPOS = { getBusinessRules: false, getMultimedia: false };
  protected recordClient?: RecordClient;
  private _message: any = null;
  public topColors: string[] = [];
  darknessThreshold: number = 40;
  public readonly lableValidClassValue: string = "text-green-700 dark:text-green-500";
  public readonly lableInvalidClassValue: string = "text-red-700 dark:text-red-500";
  public readonly inputValidClassValue: string = "border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 block dark:bg-gray-700 dark:border-green-500";
  public readonly inputInvalidClassValue: string = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  public readonly paragraphValidClassValue: string = "mt-2 text-sm text-green-600 dark:text-green-500";
  public readonly paragraphInvalidClassValue: string = "mt-2 text-sm text-red-600 dark:text-red-500";
  public touchedOrDirtyFields: Set<string> = new Set<string>();
  public buttonStyle = "background: linear-gradient(to right, topColors, #4136d8, #a036dd, #7045b4);"
  public hasBanners = false;

  constructor(
    private route: ActivatedRoute,
    private loyaltyRegisterService: LoyaltyRegisterService,
    private formBuilder: FormBuilder,
    private pointOfSaleService: PointOfSaleService,
    private routerService: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      additionalData: ['']
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pointOfSaleId = params.get('pointOfSaleId');
      if (pointOfSaleId != null) {
        this.internalInit(pointOfSaleId);
      }
    });
  }

  private internalInit(pointOfSaleId: string): void {
    this.requestPermission();
    this.pointOfSaleService.getPOSByName(pointOfSaleId).subscribe(pointOfSale => {
      this.selectedPOS = pointOfSale;
      this.hasBanners = this.selectedPOS.banners.length > 0;
      if (pointOfSale.name == pointOfSaleId.toLowerCase()) {
        this.routerService.navigate(["**"]);
      }
    });
  }

  protected onSubmit(): void {
    const fToken = localStorage.getItem('f-token');
    this.registerForm.get('additionalData')?.setValue(fToken);
    if (this.registerForm.valid) {
      const recordClient: RecordClient = this.getrecordClientValue(this.registerForm);
      this.loyaltyRegisterService.createRecordClient(recordClient).subscribe(recordClientRS => {
        console.log(recordClientRS);
      });
    }
  }

  private getrecordClientValue(registerForm: FormGroup): RecordClient {
    return {
      email: registerForm.get('email')?.value,
      name: registerForm.get('name')?.value,
      telephone: registerForm.get('phoneNumber')?.value,
      pointOfSaleId: this.selectedPOS?.pointOfSaleId,
      additionalData: registerForm.get('additionalData')?.value
    } as RecordClient
  }

  private requestPermission(): void {
    const messaging = getMessaging();
    const permissionToken = localStorage.getItem("f-token");
  
    const saveToken = (token: string | null) => {
      if (token && !permissionToken) {
        localStorage.setItem("f-token", token);
      }
    };
  
    const retrieveToken = () => {
      getToken(messaging, { vapidKey: vapidKey })
        .then(saveToken)
        .catch((err) => {
          console.error("Error getting token:", err);
          setTimeout(() => {
            getToken(messaging, { vapidKey: vapidKey }).then(saveToken);
          }, 1000);
        });
    };
    retrieveToken();
  }
  

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this._message = payload;
    });
  }

  protected isTouchedOrDirtyField(posField: string): boolean {
    return this.registerForm.get(posField)?.dirty || this.touchedOrDirtyFields.has(posField);
  }

  protected markFieldAsTouchedOrDirty(posField: string): void {
    this.touchedOrDirtyFields.add(posField);
  }

  protected isFieldValid(posField: string): boolean {
    return this.isTouchedOrDirtyField(posField) && this.registerForm.get(posField)!.invalid;
  }

  public getMainImg() {
    if (this.selectedPOS && this.selectedPOS.logo) {
      const logoSrc = `data:image/png;base64,${this.selectedPOS.logo.codificationBase64}`;
      return logoSrc
    }
    return '/'
  }

  extractColors(imageElement: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    ctx?.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);

    if (imageData) {
      const data = imageData.data;
      const colorCount: { [key: string]: number } = {};

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];

        if (alpha > 0 && !this.isColorTooDark(r, g, b)) {
          const color = `${r},${g},${b}`;
          colorCount[color] = (colorCount[color] || 0) + 1;
        }
      }

      const sortedColors = Object.entries(colorCount).sort((a, b) => b[1] - a[1]);

      if (sortedColors.length > 0) {
        const mostFrequentColor = sortedColors[0][0];
        const contrastColor = this.findMostContrastingColor(mostFrequentColor, sortedColors.slice(1));

        this.topColors = [
          `rgb(${mostFrequentColor})`,
          `rgb(${contrastColor})`
        ];

        var mainButton = document.getElementById('mainButton');
        var mainButton2 = document.getElementById('mainButton2');
        var secondBanner = document.getElementById('secondBanner');

        if (mainButton && mainButton2 && secondBanner) {
          const background = `linear-gradient(to right, rgb(${mostFrequentColor}), rgb(${mostFrequentColor}), rgb(${contrastColor}))`;
          mainButton.style.background = background
          mainButton2.style.background = background
          secondBanner.style.background = `rgb(${mostFrequentColor})`
        }
      }
    }
  }

  findMostContrastingColor(baseColor: string, colorList: [string, number][]): string {
    let maxContrast = 0;
    let contrastColor = colorList[0][0];

    const [r1, g1, b1] = baseColor.split(',').map(Number);

    for (const [color] of colorList) {
      const [r2, g2, b2] = color.split(',').map(Number);
      const isDiff = r2 != g2 && r2 != b2 && g2 != b2;
      if (r2 > 100 && g2 > 100 && b2 > 100 && r2 < 200 && g2 < 200 && b2 < 200 && isDiff) {
        const contrast = this.calculateColorDifference(r1, g1, b1, r2, g2, b2);

        if (contrast > maxContrast && !this.isColorTooDark(r2, g2, b2)) {
          maxContrast = contrast;
          contrastColor = color;
        }
      }
    }

    return contrastColor;
  }

  calculateColorDifference(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
    return Math.sqrt(
      Math.pow(r2 - r1, 2) +
      Math.pow(g2 - g1, 2) +
      Math.pow(b2 - b1, 2)
    );
  }

  isColorTooDark(r: number, g: number, b: number): boolean {
    return (r + g + b) < this.darknessThreshold;
  }

  public getMainImage(banners: Banner[] | undefined) {
    if (banners && banners.length > 0) {
      return `data:image/png;base64,${banners[0].multimedia.codificationBase64}`;
    }
    return ''
  }
}
