import SubscriptionCreate from './SubscriptionCreate.vue'
import { mount } from '@vue/test-utils'

describe('SubscriptionCreate', () => {
  it('emits the correct value when Create is clicked', async () => {
    const wrapper = mount(SubscriptionCreate)
    const inputs = wrapper.findAll('input')
    await inputs.at(0).setValue('Netflix')
    await inputs.at(1).setValue(999)
    await inputs.at(2).setValue(5)

    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('create')
    expect(wrapper.emitted().create[0]).toEqual([
      expect.objectContaining({ name: 'Netflix', profileLimit: 5, cost: 999 })
    ])
  })
})
