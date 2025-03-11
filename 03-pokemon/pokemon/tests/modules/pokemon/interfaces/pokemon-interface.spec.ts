import { describe, expect, test } from 'vitest';
import { type Pokemon } from '@/modules/pokemon/interfaces';
describe('Pokemon Interface', () => {
  test('should have a name and id', () => {
    const pokemon = { name: 'Bulbasaur', id: 1 };

    expect(pokemon.id).toEqual(expect.any(Number));
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
