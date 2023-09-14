import { FinancialProfile } from "./FinancialProfile";
import { IBA } from "./IBA";

export class OldBenefits {
    public taxableIncome: number;
    public ibaPayout: number;
    public incomeTax: number;
    public bonusTax: number;
    public retirementContribution: number;
    public takehomePay: number;
    public totalValue: number;

    constructor(fp: FinancialProfile, iba: IBA) {
        this.taxableIncome = Math.round(fp.grossSalary - fp.retirement);
        this.ibaPayout = Math.round(iba.payout);
        this.incomeTax = Math.round(fp.incomeTax);
        this.bonusTax = Math.round(0.4 * iba.payout);
        this.retirementContribution = Math.round(Math.min(fp.retirement + 0.25 * fp.grossSalary, fp.age >= 50 ? 73500 : 66000));
        this.takehomePay = Math.round(fp.netSalary + (iba.payout - this.bonusTax));
        this.totalValue = Math.round(fp.netSalary + (this.ibaPayout - this.bonusTax) + this.retirementContribution);
    }
}
