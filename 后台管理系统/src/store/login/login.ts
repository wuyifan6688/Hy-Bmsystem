import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { accountLoginRequest } from '@/service/login/login'
import { localCache } from '@/utils/cache'
const LOGIN_TOKEN = 'login/token' //随便赋的值
const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
    }
  }
})

export default useLoginStore
