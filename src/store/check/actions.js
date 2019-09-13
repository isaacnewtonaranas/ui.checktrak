import Axios from 'axios'

export default {
  async getChecks(context) {
    context.commit('loading', true)
    try {
      const url = '/' + context.rootGetters['tools/company'].code + '/check'
      const res = await Axios.get(url)
      context.commit('checks', res.data)
      context.commit('selectedChecks', [])
    } finally {
      context.commit('loading', false)
    }
  },
  async getCheck(context, id) {
    context.commit('loading', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/' + id
      const res = await Axios.get(url)
      context.commit('check', res.data)
      context.commit('showCheck', true)
      context.commit('selectedChecks', [])
    } finally {
      context.commit('loading', false)
    }
  },
  async create(context, check) {
    context.commit('creating', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/create'
      await Axios.post(url, check)
      context.commit('showCreate', false)
      context.commit('newCheck', {
        date: new Date().toISOString().substr(0, 10)
      })
      context.dispatch('getChecks')
    } finally {
      context.commit('creating', false)
    }
  },
  async claim(context, data) {
    context.commit('claiming', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/claim'
      await Axios.post(url, data)
      context.commit('showClaim', false)
      context.dispatch('getChecks')
    } finally {
      context.commit('claiming', false)
    }
  },
  async delete(context, data) {
    context.commit('deleting', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/' + data.id
      await Axios.delete(url, { data })
      context.commit('showDelete', false)
      context.dispatch('getChecks')
    } finally {
      context.commit('deleting', false)
    }
  },
  async edit(context, check) {
    context.commit('editing', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/' + check.id
      await Axios.patch(url, check)
      context.commit('showEdit', false)
      context.dispatch('getChecks')
    } finally {
      context.commit('editing', false)
    }
  },
  async transmit(context, data) {
    context.commit('transmitting', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/transmit'
      await Axios.post(url, data)
      context.commit('showTransmit', false)
      context.dispatch('getChecks')
      return
    } finally {
      context.commit('transmitting', false)
    }
  }
}