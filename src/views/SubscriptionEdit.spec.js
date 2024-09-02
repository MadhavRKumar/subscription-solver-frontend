import SubscriptionEdit from './SubscriptionEdit.vue'
import { mount } from '@vue/test-utils'

describe('SubscriptionEdit', () => {
  it('emits the correct values when Save is clicked', async () => {
    const wrapper = mount(SubscriptionEdit, {
      propsData: {
        subscription: {
          name: 'Netflix',
          profileLimit: 5,
          cost: 999
        },
        loading: false
      }
    })

    const inputs = wrapper.findAll('input')
    await inputs.at(0).setValue('Netflix')
    await inputs.at(1).setValue(999)
    await inputs.at(2).setValue(5)

    const button = wrapper.findAll('button').at(0)
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update')
    expect(wrapper.emitted().update[0]).toEqual([{ name: 'Netflix', profileLimit: 5, cost: 999 }])
  })
})
