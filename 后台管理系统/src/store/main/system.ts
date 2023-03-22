import { defineStore } from 'pinia'
import { getUserList } from '@/service/main/system/system'

interface list {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
interface result {
  userList: list[]
  totalCount: number
}
const useUserStore = defineStore('user', {
  state: (): result => ({
    userList: [],
    totalCount: 1
  }), //必须用括号包裹
  actions: {
    async postUserList() {
      const data = await getUserList()
      this.userList = data.data.list
      this.totalCount = data.data.totalCount
    }
  }
})
export default useUserStore
