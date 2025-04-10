<template>
  <aside class="bg-base-200 w-72 min-h-screen ">
    <h2 class="text-lg font-bold mx-2 hover:bg-base-300 rounded-xs p-2 cursor-pointer">
      <RouterLink :to="{ name: 'Home' }" class="block">
        Proyectos
      </RouterLink>
    </h2>
    <p v-if="projectsStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <ul v-else class="menu bg-base-200 rounded-box w-56">
      <li v-for="project in projectsStore.projectsList" :key="project.id">
        <template v-if="project.task.length > 0">
          <details open>
            <summary>
              <RouterLink class="w-full" :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
            </summary>
            <ul>
              <li v-for="task in project.task" :key="task.id">
                <RouterLink class="w-full" :to="`/project/${project.id}`">{{ task.name }}</RouterLink>
              </li>
            </ul>
          </details>
        </template>
        <template v-else>
      <li>
        <RouterLink class="w-full" :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
      </li>
</template>
</li>
</ul>
</aside>
</template>

<script lang='ts' setup>
import { useProjectsStore } from '../stores/projects.store';

const projectsStore = useProjectsStore()

</script>
