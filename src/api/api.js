import { getAction, deleteAction, postAction, putAction } from '@/api/manage'

// 用户模块api接口
const getAllUsers = (params) => getAction('/sys/user/key', params)
const getUserById = (params) => getAction('/sys/user/id', params)
const addUser = (params) => postAction('/sys/user', params)
const eidtUser = (params) => putAction('/sys/user/modify', params)
const deleteUser = (params) => deleteAction('/sys/user', params)
const getAllRole = (params) => getAction('/sys/role', params)
const getAllOrga = (params) => getAction('/sys/orga', params)
const modifyPwd = (params) => putAction('sys/user/password', params)
const modifyInfo = (params) => putAction('sys/user/modify', params)
const getAllUserByName = (params) => getAction('/sys/user/name', params)
// 角色模块api接口
const addRole = (params) => postAction('/sys/role', params)
const deleteRole = (params) => deleteAction('/sys/role', params)
const getAllPerm = (params) => getAction('/sys/perm', params)
const editPerm = (params) => postAction('/sys/role/perm', params)
// 菜单模块api接口
const addPerm = (params) => postAction('/sys/perm', params)
const deletePerm = (params) => deleteAction('/sys/perm', params)
const eidtPerm = (params) => putAction('/sys/perm', params)
// 组织管理api接口
const getAllOrgs = (params) => getAction('/sys/orga', params)
const addOrg = (params) => postAction('/sys/orga', params)
//项目管理
const getAllItem = (params) => getAction('/item/item', params)
const addItem = (params) => postAction('/item/item', params)
const eidtItem = (params) => putAction('/item/item', params)
const deleteItem = (params) => deleteAction('/item/item', params)
export {
  getAllUsers,
  getUserById,
  getAllUserByName,
  addUser,
  deleteUser,
  eidtUser,
  getAllRole,
  getAllOrga,
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
  getAllItem,
  addItem,
  eidtItem,
  deleteItem
}
