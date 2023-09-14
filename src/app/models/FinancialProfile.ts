import { RelationshipStatus } from "../enums/RelationshipStatus";
import { IBA } from "./IBA";

export class FinancialProfile {
    public age: number;
    public grossSalary: number;
    public retirement: number;
    public incomeTax: number;
    public netSalary: number;
    public iba: IBA;
    public relationshipStatus?: RelationshipStatus;

    constructor(grossSalary: number, retirement: number, ibaPayout: number, age: number, relationshipStatus: RelationshipStatus = RelationshipStatus.single) {
        this.age = age;
        this.grossSalary = grossSalary;
        this.retirement = Math.min(retirement, age >= 50 ? 30000 : 22500);
        this.incomeTax = this.calculateIncomeTax(relationshipStatus);
        this.netSalary = this.calculateNetSalary(relationshipStatus);
        this.iba = new IBA(0.25 * grossSalary, ibaPayout);
        this.relationshipStatus = relationshipStatus;
    }

    /**
     * Calculates the net salary (salary after tax)
     * @param {RelationshipStatus} relationshipStatus Filing single, married-joint, married-separate, or head-of-household
     * @returns {number} net salary
     */
    public calculateNetSalary(relationshipStatus?: RelationshipStatus): number {
        const tax = this.incomeTax ? this.incomeTax : this.calculateIncomeTax(relationshipStatus);
        return this.grossSalary - this.retirement - tax;
    }


    /**
     * Calculates income tax
     * @param {RelationshipStatus} relationshipStatus Filing single, married-joint, married-separate, or head-of-household
     * @returns {number} Rough income tax
     */
    public calculateIncomeTax(relationshipStatus?: RelationshipStatus): number {
        const taxableIncome = this.grossSalary - this.retirement;
        let brackets = [];
        let tax = 0;
        switch (relationshipStatus) {
            case RelationshipStatus.single:
                brackets = [[0.37, 578125, 174238], [0.35, 231250, 52832], [0.32, 182100, 37104], [0.24, 95375, 16290], [0.22, 44725, 5147], [0.12, 11000, 1100], [0.1, 0, 0]];
                break;
            case RelationshipStatus["married-separate"]:
                brackets = [[0.37, 346875, 93300], [0.35, 231250, 52832], [0.32, 182100, 37104], [0.24, 95375, 16290], [0.22, 44725, 5147], [0.12, 11000, 1100], [0.1, 0, 0]];
                break;
            case RelationshipStatus["head-of-household"]:
                brackets = [[0.37, 578100, 172623], [0.35, 231250, 51226], [0.32, 182100, 35498], [0.24, 95350, 14678], [0.22, 59850, 6868], [0.12, 15700, 1570], [0.1, 0, 0]];
                break;
            default:
                brackets = [[0.37, 578125, 174238], [0.35, 231250, 52832], [0.32, 182100, 37104], [0.24, 95375, 16290], [0.22, 44725, 5147], [0.12, 11000, 1100], [0.1, 0, 0]];
        }

        for (var bracket of brackets) {
            if (taxableIncome > bracket[1]) {
                tax = bracket[2] + (bracket[0] * (taxableIncome - bracket[1]));
                break;
            }
        }
        this.incomeTax = tax;
        return tax;
    }
}