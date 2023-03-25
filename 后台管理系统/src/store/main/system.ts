import { defineStore } from 'pinia'
import {
  getUserList,
  deleteUser,
  createUser
} from '@/service/main/system/system'

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
    async postUserList(
      offset: number,
      size: number,
      name?: string,
      realname?: string,
      cellphone?: number,
      enable?: number,

      createAt?: string
    ) {
      const data = await getUserList(
        offset,
        size,
        name,
        realname,
        cellphone,
        enable,
        createAt
      )
      this.userList = data.data.list
      this.totalCount = data.data.totalCount
    },
    async toDeleteUser(id: number) {
      deleteUser(id)
    },
    async toCreateUser(
      name: string,
      realname: string,
      password: string,
      cellphone: number,
      departmentId: number,
      roleId: number
    ) {
      createUser(name, realname, password, cellphone, departmentId, roleId)
    }
  }
})
export default useUserStore
