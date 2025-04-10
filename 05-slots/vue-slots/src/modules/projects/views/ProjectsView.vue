<template>
  <div  class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Projects</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projectStore.projectsWithCompletion" :key="project.id" class="hover:bg-base-300">
          <th>{{ index + 1 }}</th>
          <td>
            <span @dblclick="onEditProject(project)" class="cursor-pointer">{{ project.name }}</span>
          </td>
          <td>{{ project.taskNumber }}</td>
          <td>
            <progress class="progress progress-primary w-56" :value="project.completedPercent" max="100"></progress>
          </td>
          <td>
            <DeleteButton class="w-10 h-10" @click="onDeleteProject(project)"/>
          </td>
        </tr>

      </tbody>
    </table>

    <ButtonComponent position="bottom-right" @miEvento="onToggleModal">
      <AddButton />
    </ButtonComponent>
    <InputModal :open="openModal" @close="onToggleModal" @value="submitValue" :projectId="projectName">
      <template #header>
        <h3 class="text-lg font-bold">{{ projectId ? 'Editar Proyecto': 'Agrega Proyecto' }}</h3>
        <p class="py-4">{{ projectId ? 'Cambia el Nombre': 'Introduce un nombre' }}</p>
      </template>
    </InputModal>
  </div>
  <!-- <div v-else>
    <h2>No hay proyectos</h2>
  </div> -->
</template>

<script lang="ts" setup>
import ButtonComponent from '@/modules/common/components/ButtonComponent.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddButton from '@/modules/common/icons/AddButton.vue';
import DeleteButton from '@/modules/common/icons/DeleteButton.vue';
import type { Project } from '@/modules/projects/interfaces/projects.interface';
import { ref } from 'vue';
import { useProjectsStore } from '../stores/projects.store';
import { uid } from 'uid';


const openModal = ref(false);
const projectStore = useProjectsStore();
const projectId = ref<string | null>(null);
const projectName = ref<string | null>(null);

const onEditProject = (project: Project) => {
  projectId.value = project.id
  projectName.value = project.name
  openModal.value = true
}

const onToggleModal = () => {
  openModal.value = !openModal.value;
  projectName.value = ''
}

const onDeleteProject = (project: Project) => {
  projectStore.onDeleteProject(project)
}


const submitValue = (name: string) => {
  if(projectId.value){
    projectStore.onEditProject(projectId.value, name)
    projectId.value = null
    return
  }
  const valueProject: Project = { id: uid(), name, task: [] }
  projectStore.onAddProject(valueProject);
}


</script>
