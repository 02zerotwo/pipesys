<template>
  <div>
    <!--叶子级菜单-->
    <template v-if="item.children==null">
      <el-menu-item :key="item.id"
                    :index="item.path">{{item.ext}}</el-menu-item>
    </template>
    <!--父级菜单-->
    <el-sub-menu v-else
                 :index="item.path">
      <template #title>
        <e-icon :class="item.icon"></e-icon>
        <span style="margin-left:10px"> {{item.ext}}</span>
      </template>
      <el-menu-item-group title="">
        <template v-for="child in item.children">
          <navigationitem v-if="child.children && child.children.length>0"
                          :key="child.id"
                          :item="child" />
          <el-menu-item v-else
                        :key="child.id"
                        :index="child.path">
            <e-icon :class="child.icon"></e-icon>
            <span style="margin-left:10px"> {{child.ext}}</span>

          </el-menu-item>
        </template>
      </el-menu-item-group>
    </el-sub-menu>

  </div>
</template>

<script>
export default {
  name: "NavigationItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang='less' scoped>
</style>
