export class IBA {
    public maxValue: number;
    public payout: number;
    public hourlyRate: number;
    public ptoUsed: number;
    public oopCosts: number;

    constructor(maxValue: number, ptoUsed: number, oopCosts:number) {
        this.maxValue = maxValue;
        this.hourlyRate = maxValue/520;
        this.ptoUsed = ptoUsed;
        this.oopCosts = oopCosts;
        this.payout = maxValue - (ptoUsed * this.hourlyRate) - oopCosts;
    }
}
