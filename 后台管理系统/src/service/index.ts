import HYRequest from './request'
import { TIME_OUT, BASE_URL } from './config/index'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
export default hyRequest
