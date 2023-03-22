import hyRequest from '@/service'
export function getUserList() {
  return hyRequest.post({
    url: '/users/list',
    data: { offset: 0, size: 10 }
  })
}
