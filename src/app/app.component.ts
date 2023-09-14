import { Component } from '@angular/core';
import { FinancialProfile } from './models/FinancialProfile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CACI Benefits Calculator';

  public salaryInput!: number;
  public retirementInput!: number;
  public ibaInput!: number;
  public ageInput!: number;

  public financialProfile!: FinancialProfile;


}
