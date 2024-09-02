import SubscriptionList from './SubscriptionList.vue'
import { mount } from '@vue/test-utils'

describe('SubscriptionList', () => {
  it('displays a list of subscriptions', () => {
    const wrapper = mount(SubscriptionList, {
      propsData: {
        subscriptions: [
          { name: 'Netflix', profileLimit: 5, cost: 999 },
          { name: 'Spotify', profileLimit: 1, cost: 299 }
        ],
        loading: false
      }
    })

    const subscriptionNames = wrapper.findAll('li').map((w) => w.text())
    expect(subscriptionNames).toEqual([
      expect.stringContaining('Netflix'),
      expect.stringContaining('Spotify')
    ])
  })

  it('emits the uuid when a subscription is clicked', async () => {
    const wrapper = mount(SubscriptionList, {
      propsData: {
        subscriptions: [
          { uuid: '123', name: 'Netflix', profileLimit: 5, cost: 999 },
          { uuid: '456', name: 'Spotify', profileLimit: 1, cost: 299 }
        ],
        loading: false
      }
    })

    const subscriptionNames = wrapper.findAll('li')
    await subscriptionNames.at(0).trigger('click')
    expect(wrapper.emitted()).toHaveProperty('edit')
    expect(wrapper.emitted().edit[0]).toEqual(['123'])

    await subscriptionNames.at(1).trigger('click')
    expect(wrapper.emitted().edit[1]).toEqual(['456'])
  })

  it('emits the uuid when a subscription is focused and enter is pressed', async () => {
    const wrapper = mount(SubscriptionList, {
      propsData: {
        subscriptions: [
          { uuid: '123', name: 'Netflix', profileLimit: 5, cost: 999 },
          { uuid: '456', name: 'Spotify', profileLimit: 1, cost: 299 }
        ],
        loading: false
      }
    })

    const subscriptionNames = wrapper.findAll('li')
    await subscriptionNames.at(0).trigger('focus')
    await subscriptionNames.at(0).trigger('keydown.enter')
    expect(wrapper.emitted()).toHaveProperty('edit')
    expect(wrapper.emitted().edit[0]).toEqual(['123'])

    await subscriptionNames.at(1).trigger('focus')
    await subscriptionNames.at(1).trigger('keydown.enter')
    expect(wrapper.emitted().edit[1]).toEqual(['456'])
  })
})
