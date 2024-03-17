import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostofficeService } from './postoffice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Post Office Details';
  status: string | undefined;
  errorMessage: string | undefined;
  requestFinished = false;
  requestValid = false;
  newForm: FormGroup;

  public postofficeDetails: any;

  constructor(private fb: FormBuilder, private postofficeService: PostofficeService) {
    this.newForm = this.fb.group({
      fieldVal: ['', [Validators.required, Validators.pattern('[0-9]{6}')]]
    });
  }

  onSearch() {
    if (this.newForm.invalid) {
      return;
    }

    let enteredPinCode = this.newForm.get('fieldVal')?.value;
    this.postofficeService.getPostOfficeDetails(enteredPinCode)
      .subscribe(
        (data: any) => {
          this.postofficeDetails = data[0].PostOffice;
          this.status = data[0].Status;
          this.requestFinished = true;
          this.requestValid = this.status !== "404" && this.status !== "Error";
          this.errorMessage = "Недійсний код " + enteredPinCode + "! Введіть дійсний, шестизначний код. "
        },
        (error: any) => {
          this.errorMessage = "Сталася помилка!";
          this.requestValid = false;
          console.error(this.errorMessage);
        }
      );
  }

}

