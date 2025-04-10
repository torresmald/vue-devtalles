import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/projects.interface';
import { useLocalStorage } from '@vueuse/core';
import type { Task } from '../interfaces/tasks.interface';
import { uid } from 'uid';
export const useProjectsStore = defineStore('projects', () => {
  const initialProjects = [
    {
      id: '1',
      name: 'Hacer la compra',
      task: [],
    },
    {
      id: '2',
      name: 'Limpiar la casa',
      task: [],
    },
  ];
  const projects = ref(useLocalStorage<Project[]>('projects', []));
  const projectsList = computed(() => projects.value);
  const noProjects = computed(() => projects.value.length === 0);
  const projectsWithCompletion = computed(() => {
    return projects.value.map((project) => {
      const totalTask = project.task.length;
      const completedTask = project.task.filter((task) => task.completed).length;
      const completedPercent = totalTask ? (completedTask / totalTask) * 100 : 0;
      return {
        id: project.id,
        name: project.name,
        taskNumber: totalTask,
        completedPercent: completedPercent,
        task: []
      };
    });
  });
  const findProject = (idProject: string) => {
    return projects.value.findIndex((project) => project.id === idProject);
  };
  const forceProjectsValue = () => {
    projects.value = [...projects.value];
  };
  const onDeleteTask = (idProject: string, idTask: string) => {
    const projectIndex = projects.value.findIndex((project) => project.id === idProject);
    if (projectIndex === -1) return;
    const project = projects.value[projectIndex];
    project.task = project.task.filter((taskEl) => taskEl.id !== idTask);
    projects.value = [...projects.value];
  };
  const onAddProject = (project: Project) => {
    projects.value.push(project);
  };

  const onEditProject = (idProject: string, name: string) => {
    const projectIndex = findProject(idProject);
    if (projectIndex === -1) return;
    projects.value[projectIndex].name = name
    forceProjectsValue()
  }

  const onDeleteProject = (project: Project) => {
    projects.value = projects.value.filter(projectEl => projectEl.id !== project.id)
  }
  const onEditTask = (idProject: string, idTask: string, newValue: string) => {
    const projectIndex = findProject(idProject);
    if (projectIndex === -1) return;
    const taskIndex = projects.value[projectIndex].task.findIndex((task) => task.id === idTask);
    if (taskIndex === -1) return;
    projects.value[projectIndex].task[taskIndex].name = newValue;
    forceProjectsValue();
  };

  const onAddTask = (idProject: string, name: string, idTask?: string) => {
    if (!name) return;
    if (idTask) {
      onEditTask(idProject, idTask, name);
      return;
    }
    const projectIndex = findProject(idProject);
    if (projectIndex === -1) return;
    const project = projects.value[projectIndex];
    const newTask: Task = {
      id: uid(),
      name,
      completedAt: null,
      completed: false,
    };
    project.task.push(newTask);
    forceProjectsValue();
  };

  const onCompleteTask = (taskId: string, projectId: string) => {
    const project = projects.value.find((project) => project.id === projectId);
    if (!project) return;
    const task = project.task.find((task) => task.id === taskId);
    if (!task) return;
    task.completedAt = task.completedAt ? null : new Date();
  };

  return {
    // Properties
    projects,

    // Getters
    projectsList,
    noProjects,
    projectsWithCompletion,
    // Actions
    onAddProject,
    onAddTask,
    onCompleteTask,
    onDeleteTask,
    onEditTask,
    onEditProject,
    onDeleteProject
  };
});
