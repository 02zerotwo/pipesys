import { getAction, deleteAction, postAction, putAction } from '@/api/manage'

// 用户模块api接口
const getAllUsers = (params) => getAction('/sys/user/key', params)
const getUserById = (params) => getAction('/sys/user/id', params)
const addUser = (params) => postAction('/sys/user', params)
const eidtUser = (params) => putAction('/sys/user/modify', params)
const deleteUser = (params) => deleteAction('/sys/user', params)
const modifyPwd = (params) => putAction('sys/user/password',params)
const modifyInfo = (params) => putAction('sys/user/modify',params)
const getAllUserByName = (params) => getAction('/sys/user/name', params)
// 角色模块api接口
const getAllRole = (params) => getAction('/sys/role', params)
const addRole = (params) => postAction('/sys/role', params)
const deleteRole = (params) => deleteAction('/sys/role', params)
const getAllPerm = (params) => getAction('/sys/perm', params)
const editPerm = (params) => postAction('/sys/role/perm', params)
// 菜单模块api接口
const addPerm = (params) => postAction('/sys/perm', params)
const deletePerm = (params) => deleteAction('/sys/perm', params)
const eidtPerm = (params) => putAction('/sys/perm', params)
// 机构管理api接口
const getAllOrgs = (params) => getAction('/sys/orga', params)
const getAllType = (params) => getAction('/sys/orgaType', params)
const addOrg = (params) => postAction('/sys/orga', params)
const getUserByOrgId = (params) => getAction('/sys/user/orga', params)

export {
  getAllUsers,
  getUserById,
  getAllUserByName,
  addUser,
  deleteUser,
  eidtUser,
  getAllRole,
  modifyPwd,
  modifyInfo,
  addRole,
  deleteRole,
  getAllPerm,
  editPerm,
  addPerm,
  deletePerm,
  eidtPerm,
  getAllOrgs,
  addOrg,
  getAllType,
  getUserByOrgId
}
