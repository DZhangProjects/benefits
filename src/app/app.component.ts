import { Component } from '@angular/core';
import { FinancialProfile } from './models/FinancialProfile';
import { OldBenefits } from './models/OldBenefits';
import { NewBenefits } from './models/NewBenefits';
import { IBA } from './models/IBA';

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
  public ptoInput!: number;
  public oopInput!: number;
  public ageInput!: number;

  public financialProfile!: FinancialProfile;
  public oldBenefits!: OldBenefits;
  public newBenefits!: NewBenefits;

  /**
   * Updates all Benefits data.
   */
  public updateBenefits(): void {
    if (this.ageInput) {
      this.updateFinancialProfile();
      this.updateOldBenefits();
      this.updateNewBenefits();
    }
  }

  public updateOldBenefits(): void {
    this.oldBenefits = new OldBenefits(this.financialProfile, new IBA(this.financialProfile.grossSalary / 4, this.ptoInput, this.oopInput));
  }

  public updateNewBenefits(): void {
    this.newBenefits = new NewBenefits(this.financialProfile);
  }

  public updateFinancialProfile(): void {
    this.financialProfile = new FinancialProfile(this.salaryInput ? this.salaryInput : 0, this.retirementInput ? this.retirementInput : 0, this.ageInput ? this.ageInput : 0);
  }



}
