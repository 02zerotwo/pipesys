import { getAction, deleteAction, postAction, putAction } from '@/api/manage'

// 用户模块api接口
const getAllUsers = (params) => getAction('/sys/user/key', params)
const getUserById = (params) => getAction('/sys/user/id', params)
const addUser = (params) => postAction('/sys/user', params)
const eidtUser = (params) => putAction('/sys/user/modify', params)
const deleteUser = (params) => deleteAction('/sys/user', params)
const getAllOrga = (params) => getAction('/sys/orga', params)
const modifyPwd = (params) => putAction('sys/user/password', params)
const modifyInfo = (params) => putAction('sys/user/modify', params)
const getAllUserByName = (params) => getAction('/sys/user/name', params)
// 角色模块api接口
const getAllRole = (params) => getAction('/sys/role', params)
const addRole = (params) => postAction('/sys/role', params)
const deleteRole = (params) => deleteAction('/sys/role', params)
const getAllPerm = (params) => getAction('/sys/perm', params)
const editPerm = (params) => postAction('/sys/role/perm', params)
// 菜单模块api接口/sys/user/ids
const addPerm = (params) => postAction('/sys/perm', params)
const deletePerm = (params) => deleteAction('/sys/perm', params)
const eidtPerm = (params) => putAction('/sys/perm', params)
// 机构管理api接口
const getAllOrgs = (params) => getAction('/sys/orga', params)
const getAllType = (params) => getAction('/sys/orgaType', params)
const addOrg = (params) => postAction('/sys/orga', params)
const editOrg = (params) => putAction('/sys/orga', params)
const getUserByOrgId = (params) => getAction('/sys/user/orga', params)
const getOtherUsers = (params) => getAction('/sys/user/orgaId', params)
const getOrgUser = (params) => getAction('/sys/user/orga', params)
const addOtherUser = (params) => putAction('/sys/user/orgaId', params)
//项目管理
const getAllItem = (params) => getAction('/item/item', params)
const addItem = (params) => postAction('/item/item', params)
const eidtItem = (params) => putAction('/item/item', params)
const deleteItem = (params) => deleteAction('/item/item', params)
const getItemByOrgaId = (params) => getAction('/item/item/orgaId', params)
const getItemCount = (params) => getAction('/item/item/count', params)

//管道模型
const getAllPipeModel = (params) => getAction('/model/pipeModel', params)
const addPipeModel = (params) => postAction('/model/pipeModel', params)
const deletePipeModel = (params) => deleteAction('/model/pipeModel', params)
const eidtPipeModel = (params) => putAction('/model/pipeModel', params)


//传感器模型
const getAllSensorModel = (params) => getAction('/model/sensorModel', params)
const addSensorModel = (params) => postAction('/model/sensorModel', params)
const deleteSensorModel = (params) => deleteAction('/model/sensorModel', params)
const editSensorModel = (params) => putAction('/model/sensorModel', params)

//管道增删改查
const addPipe = (params) => postAction('/asset/pipe', params)
const getPipes = (params) => getAction('/asset/pipe', params)
const editPipe = (params) => putAction('/asset/pipe', params)
const deletePipe = (params) => deleteAction('/asset/pipe', params)
const getPipeModelByItemId = (params) => getAction('/asset/pipe/itemId', params)
//传感器管理
const getSensor = (params) => getAction('/asset/sensor', params)
const getNoUsSensor = (params) => getAction('/asset/sensorId', params)
//报警管理
const getAlarm = (params) => getAction('/alarm/alarm', params)
const editAlarm = (params) => putAction('/alarm/alarm', params)
const getSensors = (params) => getAction('/asset/sensor', params)
const addSensor = (params) => postAction('/asset/sensor', params)
const editSensor = (params) => putAction('/asset/sensor', params)
const deleteSensor = (params) => deleteAction('/asset/sensor', params)

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
  editOrg,
  getAllItem,
  addItem,
  eidtItem,
  deleteItem,
  getAllType,
  getUserByOrgId,
  getOtherUsers,
  getOrgUser,
  getAllOrga,
  addOtherUser,
  getAllPipeModel,
  addPipeModel,
  deletePipeModel,
  eidtPipeModel,
  addPipe,
  getPipes,
  editPipe,
  deletePipe,
  getAllSensorModel,
  addSensorModel,
  deleteSensorModel,
  editSensorModel,
  getSensor,
  getAlarm,
  editAlarm,
  getItemByOrgaId,
  getPipeModelByItemId,
  getNoUsSensor,
  getSensors,
  addSensor,
  editSensor,
  deleteSensor,
  getItemCount
}
