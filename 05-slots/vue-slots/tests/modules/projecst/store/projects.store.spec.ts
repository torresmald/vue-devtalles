import { describe, beforeEach, test, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProjectsStore } from '@/modules/projects/stores/projects.store.ts';
describe('useProjectsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('should return default values', () => {
    const {
      projectsList,
      noProjects,
      projectsWithCompletion,
      onAddProject,
      onAddTask,
      onCompleteTask,
      onDeleteTask,
      onEditTask,
      onEditProject,
      onDeleteProject,
    } = useProjectsStore();

    expect(projectsList).toStrictEqual([]);
    expect(noProjects).toStrictEqual(true);
    expect(projectsWithCompletion).toStrictEqual([]);
    expect(onAddProject).toBeInstanceOf(Function);
    expect(onAddTask).toBeInstanceOf(Function);
    expect(onCompleteTask).toBeInstanceOf(Function);
    expect(onDeleteTask).toBeInstanceOf(Function);
    expect(onEditTask).toBeInstanceOf(Function);
    expect(onEditProject).toBeInstanceOf(Function);
    expect(onDeleteProject).toBeInstanceOf(Function);
  });

  test('should add Project', () => {
    const store = useProjectsStore();
    const project = {
      id: '1',
      name: 'Prueba',
      task: [],
    };
    store.onAddProject(project);

    expect(store.projectsList).toStrictEqual([project]);
    expect(store.noProjects).toBe(false);
    expect(store.projectsWithCompletion).toStrictEqual([
      {
        completedPercent: 0,
        id: '1',
        name: 'Prueba',
        task: [],
        taskNumber: 0,
      },
    ]);
  });

  test('should load from LS', () => {
    const project = {
      id: '1',
      name: 'Prueba',
      task: [],
    };
    localStorage.setItem('projects', JSON.stringify([project]))
    const store = useProjectsStore()
    expect(store.projectsList).toEqual([project])
  })

  test('should NOT add task to Project if name empty', () => {
    const project = {
      id: '1',
      name: 'Prueba',
      task: [],
    };
    const store = useProjectsStore()
    store.onAddProject(project)
    const idProject = '1';
    const nameTask = '';
    store.onAddTask(idProject, nameTask)
    expect(store.projectsList[0].task).toEqual([])
  })

  test('should add task to Project', () => {
    const project = {
      id: '1',
      name: 'Prueba',
      task: [],
    };
    const store = useProjectsStore()
    store.onAddProject(project)
    const idProject = '1';
    const nameTask = 'Task 1';
    store.onAddTask(idProject, nameTask)
    expect(store.projectsList[0].task).toEqual([
         {
           "completed": false,
           "completedAt": null,
           "id": expect.any(String),
           "name": nameTask,
         },
    ])

  })

  test('toggle task to completed', () => {
    const project = {
      id: '1',
      name: 'Prueba',
      task: [],
    };
    const store = useProjectsStore()
    store.onAddProject(project)
    const idProject = '1';
    const nameTask = 'Task 1';
    store.onAddTask(idProject, nameTask)
    expect(store.projectsList[0].task[0].completedAt).toBe(null)
    const task = store.projectsList[0].task[0]
    const completedAt =  new Date()
    store.onCompleteTask(task.id, idProject)
    expect(store.projectsList[0].task[0].completedAt).toStrictEqual(completedAt)


  })
});
