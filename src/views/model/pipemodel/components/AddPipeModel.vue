<template>

  <!-- 新增管道模型 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close">
    <el-form ref="dataAddForm"
             :model="formData"
             :rules="rules"
             label-width="120px">
      <el-row>
        <el-col :span="15">
          <el-form-item label="型号编码:"
                        prop="pipeNumber">
            <el-input v-model="formData.pipeNumber"
                      placeholder="请输入型号编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="管道名称:"
                        prop="pipeName">
            <el-input v-model="formData.pipeName"
                      placeholder="请输入管道名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="管道类型:">
            <el-radio v-model="radio"
                      label="单波纹">单波纹</el-radio>
            <el-radio v-model="radio"
                      label="多波纹">多波纹</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 图片上传  修改后的文件上传 已弃用 但是后续还有参考性-->
      <!-- <el-row>
        <el-col :span="15">
          <el-form-item label="图片:">
            <el-upload class="avatar-uploader"
                       action="none"
                       :show-file-list="false"
                       :auto-upload="false"
                       :on-change="checkPic">
              <img v-if="imageUrl"
                   :src="imageUrl"
                   class="avatar" />
              <el-icon v-else
                       class="avatar-uploader-icon">
                <i-plus />
              </el-icon>
            </el-upload>
            <el-button v-if="imageUrl"
                       style="position: absolute;margin-left: 63px; margin-top: -194px;padding: 3px 5px;opacity: 0.6;"
                       icon="i-full-screen"
                       plain
                       size="mini"
                       @click="handlePictureCardPreview"></el-button>
            <el-dialog v-model="dialogVisible">
              <el-image :src="imageUrl"
                        :preview-src-list="imageUrl"
                        :initial-index="1">
              </el-image>
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- 图片上传 -->
      <el-row>
        <el-col :span="15">
          <el-form-item label="图片:">
            <el-upload action="#"
                       ref="pic"
                       list-type="picture-card"
                       :on-exceed="handleExceed"
                       :limit="1"
                       :file-list="picList"
                       :on-preview="handlePictureCardPreview"
                       :before-upload="beforePicUpload"
                       :on-remove="removePic"
                       :http-request="uploadPic">
              <el-icon>
                <i-plus />
              </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <el-image :src="dialogImageUrl"
                        :preview-src-list="dialogImageUrl"
                        :initial-index="1">
              </el-image>
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 说明书上传 -->
      <el-row>
        <el-col :span="15">
          <el-form-item label="说明书:">
            <el-upload class="upload-demo"
                       action="#"
                       :limit="1"
                       :before-upload="beforeDocUpload"
                       :on-change="changepipeIntroduce"
                       :file-list="fileList"
                       :on-remove="removeIntroduce"
                       :on-exceed="handleExceed"
                       :http-request="uploadIntroduce">
              <el-button type="primary">
                上传说明书
                <i class="el-icon-upload  el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 手册上传 -->
      <el-row>
        <el-col :span="15">
          <el-form-item label="指导手册:">
            <el-upload class="upload-demo"
                       action="#"
                       :limit="1"
                       :before-upload="beforeDocUpload"
                       :file-list="fileList1"
                       :http-request="uploadManual"
                       :on-remove="removeManual"
                       :on-exceed="handleExceed">
              <el-button type="primary">
                上传指导手册
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row></el-row>
      <el-row></el-row>
      <el-row></el-row>
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
import { addPipeModel, eidtPipeModel } from '@/api/api.js'
import { uploadAction } from '@/api/manage.js'
export default {
  components: {},

  data () {
    return {
      radio: '单波纹',//单选框这边的
      visible: false,//添加表单是否可见
      title: '',
      formData: {
        id: '',
        pipeName: '',
        pipeNumber: '',
        pipeType: '',
        pipeIntroduce: '',
        pipePic: '',
        pipeManual: ''
      },//表单数据
      pipeIntroduce: '',//存储说明书字段
      // imageUrl: '',//存储图片路径字段
      // imageFile: '',//存储图片文件字段
      dialogImageUrl: '',
      dialogVisible: false,
      picList: [],
      fileList: [],
      fileList1: [],
      addoreditFlag: {},
      rules: {
        pipeNumber: [
          {
            required: true,
            message: '管道编码不能为空',
            trigger: 'blur'
          }
        ],
        pipeName: [
          {
            required: true,
            message: '管道名称不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {},

  methods: {
    //弹出添加窗口
    add () {
      this.edit({})
    },
    edit (record) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataAddForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        this.formData = Object.assign({}, record)
        if (!Object.keys(record).length == 0) {
          this.radio = record.pipeType
          this.picList = [{ name: record.fileName[1], url: '/tp/' + record.fileRelativePath[1] }]
          this.fileList = [{ name: record.fileName[0] }]
          this.fileList1 = [{ name: record.fileName[2] }]
        }

      })
      this.addoreditFlag = record
    },
    //关闭添加窗口
    close () {
      this.visible = false
      this.picList = []
      this.fileList = []
      this.fileList1 = []
      this.radio = '单波纹'

    },
    //添加管道模型
    handleOk () {
      this.$refs.dataAddForm.validate((valid) => {
        if (valid) {
          let params = this.formData
          if (params.pipePic == '' || params.pipePic == null) {
            this.$message.error('管道图片不能为空!')
            return false
          }
          if (params.pipeIntroduce == '' || params.pipeIntroduce == null) {
            this.$message.error('管道说明书不能为空!')
            return false
          }
          if (params.pipeManual == '' || params.pipeManual == null) {
            this.$message.error('管道指导手册不能为空!')
            return false
          }
          params.pipeType = this.radio
          if (Object.keys(this.addoreditFlag).length == 0) {
            addPipeModel(params).then(res => {
              if (res.status === 200) {
                this.$message.success('添加管道模型成功!')
              }
              this.$emit('ok')
              this.close()
            })
          } else {
            eidtPipeModel(params).then(res => {
              if (res.status === 200) {
                this.$message.success('修改管道模型成功!')
              }
              this.$emit('ok')
              this.close()
            })
          }
        } else {
          return false
        }
      })

      // addPipeModel(params, this.formData).then(res => {
      //   this.visible = false;
      //   this.$message.success("添加成功")
      // })
    },
    handleExceed (files, fileList) {
      this.$message.error("上传数量超过限制");
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforePicUpload (file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      const isJPG = ['image/jpeg', 'image/png'].indexOf(file.type.toLowerCase()) === -1
      if (isJPG) {
        this.$message.error('图片只能选择jpeg/png格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2MB!')
        return false
      }
    },
    beforeDocUpload (file, fileList) {
      const isJPG = ['application/msword'].indexOf(file.type.toLowerCase()) === -1
      if (isJPG) {
        this.$message.error('只能选择doc格式!')
        return false
      }
    },
    uploadPic (params) {
      let fromData = new FormData()
      fromData.append("file", params.file)
      uploadAction('/model/upload', fromData).then(res => {
        if (res.status === 200) {
          this.formData.pipePic = res.data[0]
          params.onSuccess('图片上传成功')
        } else {
          this.$message.error('图片上传失败!')
          params.onError()
        }
      })
    },
    uploadIntroduce (params) {
      let fromData = new FormData()
      fromData.append("file", params.file)
      uploadAction('/model/upload', fromData).then(res => {
        if (res.status === 200) {
          this.formData.pipeIntroduce = res.data[0]
          params.onSuccess('文件上传成功')
        } else {
          this.$message.error('文件上传失败!')
          params.onError()
        }
      })
    },
    uploadManual (params) {

      let fromData = new FormData()
      fromData.append("file", params.file)
      uploadAction('/model/upload', fromData).then(res => {
        if (res.status === 200) {
          this.formData.pipeManual = res.data[0]
          params.onSuccess('文件上传成功')
        } else {
          this.$message.error('文件上传失败!')
          params.onError()
        }
      })


    },
    removePic (file, fileList) {
      this.formData.pipePic = ''
    },
    removeIntroduce (file, fileList) {
      this.formData.pipeIntroduce = ''
    },
    removeManual (file, fileList) {
      this.formData.pipeManual = ''
    }
    // checkPic (file, fileList) { 已弃用的文件校验
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   const isJPG = ['image/jpeg', 'image/png'].indexOf(file.raw.type.toLowerCase()) === -1
    //   if (isJPG) {
    //     this.$message.error('图片只能选择jpeg/png格式!')
    //     console.log(this.$refs.pipePic);
    //     return false
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('图片大小不能超过2MB!')
    //     return false
    //   }
    //   this.imageFile = file
    //   this.imageUrl = URL.createObjectURL(file.raw)
    // }



  }
}
</script>
<style lang='less'>
// .avatar-uploader .el-upload {
//   border: 1px dashed #d9d9d9;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//   border-color: #409eff;
// }
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   text-align: center;
// }
// .avatar-uploader-icon svg {
//   margin-top: 74px; /* (178px - 28px) / 2 - 1px */
// }
// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
</style>
