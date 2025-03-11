import { computed, ref } from 'vue';

export const useCounter = (initialValue: number = 5) => {
  const counter = ref(initialValue);

  {
    return {
      counter,
      square: computed(() => counter.value * counter.value),
    };
  }
};
