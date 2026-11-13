import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null
  }),
  actions: {
    setUser(info) {
      this.userInfo = info
    },
    logout() {
      this.userInfo = null
    }
  }
})
