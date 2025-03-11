import { GameStatus } from '@/modules/pokemon/interfaces';
import { describe, expect, test } from 'vitest';

describe('GameStatus enum', () => {
  test('should be enum', () => {
    expect(GameStatus.Lost).toBe('Lost');
    expect(GameStatus.Playing).toBe('Playing');
    expect(GameStatus.Won).toBe('Won');
  });
});
