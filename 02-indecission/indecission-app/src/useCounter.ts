import { computed, ref } from 'vue';

export const useCounter = (value: number) => {
  const counter = ref(value);
  const square = computed(() => counter.value * counter.value);

  const incrementCounter = () => {
    counter.value++;
  };

  const decrementCounter = () => {
    counter.value--;
  };

  return {
    counter,
    square,
    incrementCounter,
    decrementCounter,
  };
};
