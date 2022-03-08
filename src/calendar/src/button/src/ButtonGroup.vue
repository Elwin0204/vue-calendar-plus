<template>
  <div class="aw-button-group">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'AwButtonGroup'
  };
</script>
<style lang="less" scoped>
.aw-button-group {
  display: inline-block;
  vertical-align: middle;
}
.aw-button-group::before,
.aw-button-group::after {
  display: table;
  content: "";
}

.aw-button-group::after {
  clear: both;
}

.aw-button-group > .el-button {
  float: left;
  position: relative;
}
.aw-button-group > .el-button + .el-button {
  margin-left: 0;
}
.aw-button-group > .el-button.is-disabled {
  z-index: 1;
}
.aw-button-group > .el-button:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.aw-button-group > .el-button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.aw-button-group > .el-button:first-child:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.aw-button-group > .el-button:first-child:last-child.is-round {
  border-radius: 20px;
}
.aw-button-group > .el-button:first-child:last-child.is-circle {
  border-radius: 50%;
}
.aw-button-group > .el-button:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.aw-button-group > .el-button:not(:last-child) {
  margin-right: -1px;
}
.aw-button-group > .el-button:hover, .aw-button-group > .el-button:focus, .aw-button-group > .el-button:active {
  z-index: 1;
}
.aw-button-group > .el-button.is-active {
  z-index: 1;
}

.aw-button-group > .el-dropdown > .el-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--primary:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--primary:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--primary:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--success:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--success:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--success:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--warning:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--warning:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--warning:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--danger:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--danger:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--danger:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--info:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--info:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.aw-button-group .el-button--info:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
</style>