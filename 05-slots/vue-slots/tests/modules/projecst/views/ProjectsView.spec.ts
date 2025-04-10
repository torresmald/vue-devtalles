import { describe, test, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { useProjectsStore } from '@/modules/projects/stores/projects.store.ts';

describe('<ProjectsView />', () => {
  const wrapper = mount(ProjectsView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const store = useProjectsStore();
  const fakeProject = { id: '1', name: 'Proyecto 1', task: [] };
  beforeEach(() => {
    store.$patch({
      projects: [fakeProject],
    });
  });

  test('should render table', () => {
    const tableRows = wrapper.findAll('tbody tr');
    tableRows.forEach((row) => {
      const cell = row.findAll('td');
      expect(cell.at(0)?.text()).toBe(fakeProject.name);
      expect(cell.at(1)?.text()).toBe(fakeProject.task.length.toString());
    });
  });
  test('should trigger onToggleModal when modal is closed', async () => {
    const modal = wrapper.findComponent({ name: 'InputModal' });
    const newProject = 'Nuevo';
    modal.vm.$emit('value', newProject);

    expect(modal.emitted().value).toStrictEqual([['Nuevo']]);
    expect(store.onAddProject).toHaveBeenCalled();
    expect(store.onAddProject).toHaveBeenCalledWith({
      id: expect.any(String),
      name: newProject,
      task: [],
    });
  });
});
