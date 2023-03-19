let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.prod:8000'
} else {
  BASE_URL = 'http://coderwhy.dev:8000'
}

export { BASE_URL }
export const TIME_OUT = 10000
