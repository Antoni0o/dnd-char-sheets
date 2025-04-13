import { Damage } from './spell-damage-models';

export default class SpellModel {
  constructor(
    public name: string,
    public index: string,
    public level: number,
    public desc?: string,
    public components?: string,
    public concentration?: boolean,
    public damage?: Damage,
    public duration?: string,
    public higherLevel?: string,
    public material?: string,
    public range?: string,
    public ritual?: boolean,
    public isSelected?: boolean,
  ) {}
}
