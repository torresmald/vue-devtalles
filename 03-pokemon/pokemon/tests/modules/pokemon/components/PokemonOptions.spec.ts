import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

const options = [
  {
    name: 'Bulbasaur',
    id: 1,
  },
  {
    name: 'Ivysaur',
    id: 2,
  },
  {
    name: 'Venusaur',
    id: 3,
  },
];

describe('<PokemonOptions />', () => {
  const wrapper = mount(PokemonOptions, {
    props: { pokemonsOptions: options, blockSelection: false, correctAnswer: 1 },
  });
  test('should render options', () => {
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(options.length);
    buttons.forEach((button, index) => {
      expect(button.text()).toEqual(options[index].name);
    });
    const correctAnswer = 1;

    expect(buttons[correctAnswer].text()).toBe(options[correctAnswer].name);
  });

  test('should emit event when clicked', async () => {
    const valueId = 1;
    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted('selectedPokemon')?.[0]).toEqual([valueId]);
  });

  test('have disabled buttons if blockSelection', () => {
    const wrapper = mount(PokemonOptions, {
      props: { pokemonsOptions: options, blockSelection: true, correctAnswer: 1 },
    });
    const buttons = wrapper.findAll('button');
    buttons.forEach((button) => {
      expect(button.attributes().disabled).toBe('');
    });
  });

  test('doesnt have disable if blockSelection', () => {
    const wrapper = mount(PokemonOptions, {
      props: { pokemonsOptions: options, blockSelection: false, correctAnswer: 1 },
    });
    const buttons = wrapper.findAll('button');
    buttons.forEach((button) => {
      expect(button.attributes().disabled).toBeFalsy();
    });
  });

  test('apply correct classes', () => {
    const correctAnswer = 1;
    const wrapper = mount(PokemonOptions, {
      props: { pokemonsOptions: options, blockSelection: true, correctAnswer },
    });
    const buttons = wrapper.findAll('button');

    buttons.forEach((button, index) => {
      if (correctAnswer === options[index].id) {
        expect(button.classes()).toContain('correct');
      } else {
        expect(button.classes()).toContain('incorrect');
      }
    });
  });
});
