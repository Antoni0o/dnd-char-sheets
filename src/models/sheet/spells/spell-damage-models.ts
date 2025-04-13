export class Damage {
  constructor(
    public damageType: string,
    public damageByLevel: Array<DamageByLevel>,
  ) {}
}

export class DamageByLevel {
  constructor(
    public level: number,
    public value: string,
  ) {}
}
