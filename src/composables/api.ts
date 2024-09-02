import { ref, watchEffect, toValue } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Subscription } from '@/types'

const baseUrl = import.meta.env.VITE_API_URL

export default () => {
  const error = ref(null)
  const loading = ref(true)
  const subscriptions = ref<Subscription[]>([])

  const useGet = (uuid: Ref<String> | ComputedRef<String | String[]>) => {
    const subscription = ref<Subscription>({ uuid: '', name: '', profileLimit: 0, cost: 0 })
    const get = async () => {
      loading.value = true
      return fetch(`${baseUrl}/${toValue(uuid)}`)
        .then((res) => res.json())
        .then((res) => {
          subscription.value = res
        })
        .catch((err) => {
          error.value = err
        })
        .finally(() => {
          loading.value = false
          list()
        })
    }

    watchEffect(() => {
      if (uuid.value) {
        get()
      }
    })

    return { subscription }
  }

  const update = async (body: Subscription) => {
    const subscription = ref<Subscription>({ uuid: '', name: '', profileLimit: 0, cost: 0 })
    loading.value = true
    return fetch(`${baseUrl}/${body.uuid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res) => {
        subscription.value = res
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        list()
        loading.value = false
      })
  }

  const remove = async (uuid: string) => {
    const subscription = ref<Subscription>({ uuid: '', name: '', profileLimit: 0, cost: 0 })
    loading.value = true
    return fetch(`${baseUrl}/${uuid}`, {
      method: 'DELETE'
    })
      .then(() => {
        subscription.value = { uuid: '', name: '', profileLimit: 0, cost: 0 }
        list()
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  const list = async () => {
    loading.value = true
    return fetch(baseUrl)
      .then((res) => res.json())
      .then((res) => {
        subscriptions.value = res
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }
  list()

  const create = async (body: Subscription) => {
    loading.value = true
    return fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res: Subscription) => {
        return res
      })
      .catch((err) => {
        error.value = err
        throw err
      })
      .finally(() => {
        list()
        loading.value = false
      })
  }

  return { useGet, subscriptions, update, remove, create, loading, error }
}
