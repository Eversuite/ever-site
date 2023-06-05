import type { Ability } from './class/Ability';

export function abilitySlot(abilities: Ability[], slot: string): Ability {
	return (
		abilities
			// We want to ignore every ability where the slot is unknown.
			.filter((ab) => ab.slot != undefined || ab.slot != null)
			.find((ability) => ability.slot.toUpperCase() === slot.toUpperCase())
	);
}
