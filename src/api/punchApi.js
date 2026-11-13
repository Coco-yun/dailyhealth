import request from './request'

export function login(username, password) {
  return request.get('/users', { params: { username, password } })
}

export function getUserInfo(uid) {
  return request.get(`/users/${uid}`)
}

export function getUserPunchList(uid) {
  return request.get('/punches', { params: { userId: uid } })
}

export function getDayPunch(uid, date) {
  return request.get('/punches', { params: { userId: uid, date } })
}

export function submitPunch(data) {
  return request.post('/punches', data)
}

export function getAllPunch() {
  return request.get('/punches')
}

export function editPunch(id, data) {
  return request.put(`/punches/${id}`, data)
}

export function delPunch(id) {
  return request.delete(`/punches/${id}`)
}

export function getNoticeList() {
  return request.get('/notices')
}
export function addNotice(data) {
  return request.post('/notices', data)
}
export function editNotice(id, data) {
  return request.put(`/notices/${id}`, data)
}
export function delNotice(id) {
  return request.delete(`/notices/${id}`)
}
