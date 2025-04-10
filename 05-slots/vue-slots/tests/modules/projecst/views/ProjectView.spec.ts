import { describe, expect, Mock, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectView from '@/modules/projects/views/ProjectView.vue';
import { useProjectsStore } from '@/modules/projects/stores/projects.store.ts';
import { useRouter } from 'vue-router';
vi.mock('vue-router');
vi.mock('@/modules/projects/stores/projects.store.ts');
const project = [
  {
    id: '1',
    name: 'Hola',
    task: [
      {
        id: '1',
        name: 'Patatas',
        completedAt: null,
        completed: undefined,
      },
    ],
  },
];
describe('<ProjectView />', () => {
  test('should render ProjectView', () => {
    (useProjectsStore as any).mockReturnValue({
      projectsList: project,
    });

    const wrapper = mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });
    const deleteButton = wrapper.findComponent({ name: 'DeleteButton' });
  });

  test('should redirect to home if no project', () => {
    (useProjectsStore as any).mockReturnValue({
      projectsList: [],
    });

    const replaceSpy = vi.fn();
    (useRouter as Mock).mockReturnValue({
      replace: replaceSpy,
    });

    mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });

    expect(replaceSpy).toHaveBeenCalledWith({ name: 'home' });
  });
});
