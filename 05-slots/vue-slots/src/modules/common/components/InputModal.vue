<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <slot name="header">
      </slot>
      <div class="modal-action">
        <form method="dialog" class="flex flex-col gap-4 w-full">
          <input ref="inputRef" type="text" placeholder="Name" class="input input-bordered w-full" v-model="inputValue"
          @keydown.enter.prevent="submitValue" />
          <div class="flex justify-end gap-2">
            <button @click="closeModal" class="btn">Close</button>
            <button type="button" @click="submitValue" class="btn btn-primary">Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script lang='ts' setup>
import { nextTick } from 'vue';

import { ref, watch } from 'vue';
interface Props {
  open: boolean,
  projectId: string | null
}
interface Emits {
  close: [void],
  value: [text: string];
}

const inputValue = ref<string|null>('');
const inputRef = ref<HTMLInputElement | null>(null);
const props = defineProps<Props>()
const emits = defineEmits<Emits>();

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus();
    return;
  }
  emits('value', inputValue.value.trim());
  emits('close');
  resetValues()
};

const closeModal = () => {
  emits('close');
  resetValues()
}

const resetValues = () => {
  inputValue.value = '';
}

watch(() => props.open, async (newProps) => {
  if (newProps) {
    await nextTick();
    inputRef.value?.focus();
  }
});

watch(() => props.projectId, async (newProps) => {
  if(newProps){
    inputValue.value = props.projectId
  }
});


</script>
