<template>
  <div>
    <div class="tree-div">
      <vue3-tree-org
        :data="data"
        :disabled="disaled"
        :horizontal="horizontal"
        :toolBar="false"
        :collapsable="collapsable"
        :label-style="style"
        :node-draggable="true"
        :only-one-node="onlyOneNode"
        :clone-node-drag="cloneNodeDrag"
        :node-draging="nodeDragMove"
        :node-drag-end="nodeDragEnd"
        @on-contextmenu="onMenus"
        @on-expand="onExpand"
        @on-node-click="onNodeClick"
      >
        <template v-slot="{ node }">
          <div class="">
            <span class="node-label">{{ node.label }}</span>
            <span class="node-value">{{ node.value }}</span>
          </div>
        </template>
      </vue3-tree-org>
    </div>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";

export default {
  components: {},
  data() {
    return {
      data: {},
      horizontal: true,
      collapsable: true,
      onlyOneNode: true,
      cloneNodeDrag: true,
      expandAll: true,
      disaled: false,
      style: {
        background: "#fff",
        color: "#5e6d82",
      },
    };
  },
  created() {
    this.toggleExpand(this.data, this.expandAll);
  },
  mounted() {
    this.getData();
    console.log('ssfsd')
  },
  methods: {
    getData() {
      this.proxy.$http
        .get("http://192.168.43.104:8060/api/v1/browser/www.336z.net/tree")
        .then((resp) => {
          if (resp.data.code == 0) {
            this.data = resp.data.data;
            console.log(this.data);
          } else {
            ElMessage.error(resp.data.msg);
          }
        })
        .catch((error) => {});
    },
    onMenus({ node, command }) {
      console.log(node, command);
    },
    onExpand(e, data) {
      console.log(e, data);
    },
    nodeDragMove(data) {
      console.log(data);
    },
    nodeDragEnd(data, isSelf) {
      console.log(data, isSelf);
    },
    onNodeClick(e, data) {
      ElMessage.info(data.label);
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          item.expand = val;
          if (item.children) {
            this.toggleExpand(item.children, val);
          }
        });
      } else {
        data.expand = val;
        if (data.children) {
          this.toggleExpand(data.children, val);
        }
      }
    },
  },
  setup(props, { emit }) {
    const { ctx, proxy } = getCurrentInstance();
    return {
      proxy,
    };
  },
};
</script>

<style scoped>
.tree-div {
  height: 500px;
  min-width: 500px;
  min-height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: auto;
}
</style>
