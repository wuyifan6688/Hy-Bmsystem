import { defineStore } from 'pinia'
import { getRoleList, getDepartment } from '@/service/main/main'
interface departmentList {
  id: number
  name: string
  parentId: number
  createAt: string
  updateAt: string
  leader: string
}
interface roleList {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: any[]
}
interface result {
  department: departmentList[]
  role: roleList[]
}
const useMainStore = defineStore('main', {
  state: (): result => ({
    department: [],
    role: []
  }),
  actions: {
    async togetRoleList() {
      const data = await getRoleList()
      this.role = data.data.list
    },
    async togetDepartment() {
      const data = await getDepartment()

      this.department = data.data.list
    }
  }
})
export default useMainStore
