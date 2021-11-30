<template>

  <!-- 新增传感器 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close">
    <el-form ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="120px">
      <el-row style="text-align: center">
        <el-col :span="14">
          <el-form-item label="传感器编码:"
                    prop="sensorCode">
            <el-input v-model="ruleForm.sensorCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item label="传感器名称:"
                    prop="sensorName">
            <el-input v-model="ruleForm.sensorName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="传感器模型:">
        <el-select v-model="models"
                    multiple
                    placeholder="请选择模型">
          <el-option v-for="item in m_options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属项目:">
        <el-select v-model="items"
                    multiple
                    placeholder="请选择所属项目">
          <el-option v-for="item in i_options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属厂家:">
        <el-select v-model="orgas"
                    multiple
                    placeholder="请选择所属厂家">
          <el-option v-for="item in o_options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="协议选择:">
        <el-select v-model="protocols"
                    multiple
                    placeholder="请选择协议">
          <el-option v-for="item in p_options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>    
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary"
                   @click="handleOk">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data () {
    return {
      visible: false,
      title: '',
      ruleForm: {
        // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        
      },
      models: [],
      items: [],
      orgas: [],
      m_options: [{id:1,name:'模型1'},{id:2,name:'模型2'}],
      i_options: [{id:1,name:'项目1'},{id:2,name:'项目2'}],
      o_options: [{id:1,name:'厂家1'},{id:2,name:'厂家2'}],
      p_options: [{id:1,name:'MQTT'},{id:2,name:'ModBus'}],
      // 表单验证
      rules: {
        sensorCode: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          }
        ],
      },
    }
  },

  computed: {},

  methods: {
    add() {
      this.visible = true
    }
  },
}
</script>
<style lang='less'>
</style>
