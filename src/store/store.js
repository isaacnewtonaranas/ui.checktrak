import Vue from 'vue'
import Vuex from 'vuex'
import Error from './../helper/Error'

import auth from './auth/store'
import company from './company/store'
import user from './user/store'
import access from './access/store'
import branch from './branch/store'
import group from './group/store'
import tools from './tools/store'
import account from './account/store'
import payee from './payee/store'
import check from './check/store'
import transmittal from './transmittal/store'
import imports from './imports/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    company,
    user,
    access,
    branch,
    group,
    tools,
    account,
    payee,
    check,
    transmittal,
    imports
  },
  state: {
    alert: {},
    drawer: true,
    error: new Error(),
    filter: false,
    footer: false,
    loader: true,
    loading: true,
    showAlert: false
  },
  mutations: {
    alert(state, payload) {
      state.alert = payload
      state.showAlert = true
    },
    drawer(state, payload) {
      state.drawer = payload
    },
    filter(state, payload) {
      state.filter = payload
    },
    footer(state, payload) {
      state.footer = payload
    },
    loader(state, payload) {
      state.loader = payload
    },
    loading(state, payload) {
      state.loader = payload
      state.loading = payload
    },
    showAlert(state, payload) {
      state.showAlert = payload
    }
  },
  actions: {
    async loadData(context) {
      context.commit('loading', true)
      try {
        await context.dispatch('auth/getUser')
        await context.dispatch(
          'tools/getCompany',
          localStorage.getItem('company_id')
        )
        // await context.dispatch('tools/getUsers')
        // await context.dispatch('tools/getAccess')
        // await context.dispatch('tools/getBranches')
        // await context.dispatch('tools/getActions')
        // await context.dispatch('tools/getModules')
        // await context.dispatch('tools/getGroups')
        // await context.dispatch('tools/getPayeeGroup')
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async loadData2(context) {
      context.commit('check/waiting', true)
      try {
        await context.dispatch('tools/getPayees')
        await context.dispatch('tools/getAccounts')
        context.commit('check/waiting', false)
        context.commit('footer', true)
      } catch (error) {
        return
      } finally {
        context.commit('check/waiting', false)
      }
    }
  },
  getters: {
    alert(state) {
      return state.alert
    },
    drawer(state) {
      return state.drawer
    },
    error(state) {
      return state.error
    },
    filter(state) {
      return state.filter
    },
    footer(state) {
      return state.footer
    },
    loader(state) {
      return state.loader
    },
    loading(state) {
      return state.loading
    },
    showAlert(state) {
      return state.showAlert
    }
  }
})
