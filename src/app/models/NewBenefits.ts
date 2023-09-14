import { FinancialProfile } from "./FinancialProfile";

export class NewBenefits {
  public taxableIncome: number;
  public ibaPayout: number;
  public incomeTax: number;
  public bonusTax: number;
  public retirementContribution: number;
  public takehomePay: number;
  public totalValue: number;

  constructor(fp: FinancialProfile) {
      const newFP = new FinancialProfile(fp.grossSalary * 1.25, fp.retirement + (0.25 * fp.grossSalary), fp.age, fp.relationshipStatus);
      this.taxableIncome = Math.round(newFP.grossSalary - newFP.retirement);
      this.ibaPayout = 0;
      this.incomeTax = Math.round(newFP.incomeTax);
      this.bonusTax = Math.round(0.4 * this.ibaPayout);
      this.retirementContribution = Math.round(Math.min(newFP.retirement, newFP.age >= 50 ? 73500 : 66000));
      this.takehomePay = Math.round(newFP.netSalary + (this.ibaPayout - this.bonusTax));
      this.totalValue = Math.round(newFP.netSalary + (this.ibaPayout - this.bonusTax) + this.retirementContribution);
  }
}
