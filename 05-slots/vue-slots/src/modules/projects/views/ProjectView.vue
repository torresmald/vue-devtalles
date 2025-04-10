<template>
  <div class="w-full">
    <section class="m-2">
      <BreadCrumbs :projectName="projectName?.name ?? 'No hay nombre'" />
    </section>
    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table my-4">
          <!-- head -->
          <thead>
            <tr>
              <th>Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-base-300" v-for="(task, index) in projectName?.task" :key="index">
              <td>
                <input type="checkbox" class="checkbox checkbox-success" v-model="task.completed"
                  :checked="task.completed" @change="projectStore.onCompleteTask(task.id, projectName!.id)" />
              </td>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
              <td class="flex gap-2">
                <DeleteButton class="w-8 h-8 cursor-pointer"
                  @click="projectStore.onDeleteTask(projectName!.id, task.id)" />
                <EditButton class="w-8 h-8 cursor-pointer" @click="onEditTask(task.id, task.name)" />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="text"
          class="input input-primary w-[30%] block m-auto opacity-60 transition-all hover:opacity-100 focus:opacity-100"
          placeholder="Nueva Tarea" v-model="inputValue" @keypress.prevent.enter="submitValue">
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';


import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '../stores/projects.store';
import type { Project } from '../interfaces/projects.interface';
import DeleteButton from '@/modules/common/icons/DeleteButton.vue';
import EditButton from '@/modules/common/icons/EditButton.vue';
const projectStore = useProjectsStore()
const router = useRouter()

interface Props {
  id: string
}

const props = defineProps<Props>()
const projectName = ref<Project | undefined>()
const inputValue = ref('')
const editingTaskId = ref<string | null>(null);

const submitValue = () => {
  if (editingTaskId.value) {
    projectStore.onEditTask(props.id, editingTaskId.value, inputValue.value);
    editingTaskId.value = null
  } else {
    projectStore.onAddTask(props.id, inputValue.value);
  }
  inputValue.value = '';
}

const onEditTask = (taskId: string, newValue: string) => {
  inputValue.value = newValue;
  editingTaskId.value = taskId;
};
watch(props, () => {
  projectName.value = projectStore.projectsList.find(project => project.id === props.id)
  if (!projectName.value) {
    router.replace({ name: 'home' })
  }
}, { immediate: true })
</script>
