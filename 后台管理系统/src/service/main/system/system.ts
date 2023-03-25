import hyRequest from '@/service'
export function getUserList(
  offset: number,
  size: number,
  name?: string,
  realname?: string,
  cellphone?: number,
  enable?: number,
  createAt?: string
) {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: offset,
      size: size,
      name,
      realname,
      cellphone,
      enable,
      createAt
    }
  })
}
export function deleteUser(id: number) {
  return hyRequest.delete({
    url: `users/${id}`
  })
}
export function createUser(
  name: string,
  realname: string,
  password: string,
  cellphone: number,
  departmentId: number,
  roleId: number
) {
  return hyRequest.post({
    url: '/users',
    data: {
      name,
      realname,
      password,
      cellphone,
      departmentId,
      roleId
    }
  })
}
