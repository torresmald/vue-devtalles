import {describe, test, expect, beforeEach} from 'vitest'
import {mount} from '@vue/test-utils'
import SideMenu from '@/modules/projects/components/SideMenu.vue'
import {  createPinia } from 'pinia';
import { useProjectsStore } from '@/modules/projects/stores/projects.store.ts';
import { nextTick } from 'vue';




describe('<Side Menu />', () => {
  const wrapper = mount(SideMenu, {
    global: {
      stubs: ['RouterLink'],
      plugins: [createPinia()]
    }
  })
  const store = useProjectsStore()

  beforeEach(() => {
    store.$patch({
      projects: []
    })
  })




  test('should render No Projects', () => {
     expect(wrapper.html()).contain('No hay proyectos')
  })

  test('should render Projects', async () => {
    store.$patch({
      projects: [{id: '1', name: 'Proyecto 1', task: []}]
    })
    await nextTick()
    expect(wrapper.html()).not.contain('No hay proyectos')
 })
});

