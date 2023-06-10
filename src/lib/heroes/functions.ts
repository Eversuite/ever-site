import type { Ability } from '$lib/class/Ability';

export function filterAbility(abilities: Ability[] | undefined, currentStance: number) {
	return (abilities || []).filter((ability) => (ability.stance & currentStance) > 0);
}
