import { FinancialProfile } from "./FinancialProfile";

export class OldBenefits {
    public taxableIncome: number;
    public ibaPayout: number;
    public incomeTax: number;
    public bonusTax: number;
    public retirementContribution: number;
    public totalValue: number;

    constructor(fp: FinancialProfile) {
        this.taxableIncome = fp.grossSalary - fp.retirement;
        this.ibaPayout = fp.iba.payout;
        this.incomeTax = fp.incomeTax;
        this.bonusTax = 0.4 * fp.iba.payout;
        this.retirementContribution = Math.min(fp.retirement + 0.25 * fp.grossSalary, fp.age >= 50 ? 73500 : 66000);
        this.totalValue = fp.netSalary + (this.ibaPayout - this.bonusTax) + this.retirementContribution;
    }
}