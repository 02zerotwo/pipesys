import { getAction, deleteAction, postAction, putAction } from '@/api/manage'

// 用户模块api接口
const getAllUsers = (params) => getAction('/sys/user/key', params)
const getUserById = (params) => getAction('/sys/user/id', params)
const addUser = (params) => postAction('/sys/user', params)
const eidtUser = (params) => putAction('/sys/user/modify', params)
const deleteUser = (params) => deleteAction('/sys/user', params)
const getAllRole = (params) => getAction('/sys/role', params)
const getAllOrga = (params) => getAction('/sys/orga', params)

export {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  eidtUser,
  getAllRole,
  getAllOrga
}
