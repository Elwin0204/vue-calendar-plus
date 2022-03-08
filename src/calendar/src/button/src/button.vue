<template>
  <button
    class="aw-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'aw-button--' + type : '',
      buttonSize ? 'aw-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="aw-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: 'AwButton',
  inject: {
    awForm: {
      default: ''
    },
    awFormItem: {
      default: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    loading: Boolean,
    autofocus: Boolean,
    nativeType: {
      type: String,
      default: 'button'
    },
    size: String,
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    _awFormItemSize () {
      return (this.awFormItem || {}).awFormItemSize;
    },
    buttonDisabled () {
      return this.disabled || (this.awForm || {}).disabled;
    },
    buttonSize () {
      return this.size || this._awFormItemSize || (this.$ELEMENT || {}).size;
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt);
    }
  }
}
</script>
<style lang="less" scoped>
.aw-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFFFFF;
  border: 1px solid #DCDFE6;
  border-color: #DCDFE6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.aw-button + .aw-button {
  margin-left: 10px;
}
.aw-button.is-round {
  padding: 12px 20px;
}
.aw-button:hover, .aw-button:focus {
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.aw-button:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: none;
}
.aw-button::-moz-focus-inner {
  border: 0;
}
.aw-button [class*=el-icon-] + span {
  margin-left: 5px;
}
.aw-button.is-plain:hover, .aw-button.is-plain:focus {
  background: #FFFFFF;
  border-color: #409EFF;
  color: #409EFF;
}
.aw-button.is-plain:active {
  background: #FFFFFF;
  border-color: #3a8ee6;
  color: #3a8ee6;
  outline: none;
}

.aw-button.is-active {
  color: #3a8ee6;
  border-color: #3a8ee6;
}

.aw-button.is-disabled, .aw-button.is-disabled:hover, .aw-button.is-disabled:focus {
  color: #C0C4CC;
  cursor: not-allowed;
  background-image: none;
  background-color: #FFFFFF;
  border-color: #EBEEF5;
}
.aw-button.is-disabled.el-button--text {
  background-color: transparent;
}
.aw-button.is-disabled.is-plain, .aw-button.is-disabled.is-plain:hover, .aw-button.is-disabled.is-plain:focus {
  background-color: #FFFFFF;
  border-color: #EBEEF5;
  color: #C0C4CC;
}

.aw-button.is-loading {
  position: relative;
  pointer-events: none;
}
.aw-button.is-loading:before {
  pointer-events: none;
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, 0.35);
}

.aw-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}

.aw-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}

.aw-button--primary {
  color: #FFFFFF;
  background-color: #409EFF;
  border-color: #409EFF;
}
.aw-button--primary:hover, .aw-button--primary:focus {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #FFFFFF;
}
.aw-button--primary:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #FFFFFF;
  outline: none;
}
.aw-button--primary.is-active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #FFFFFF;
}
.aw-button--primary.is-disabled, .aw-button--primary.is-disabled:hover, .aw-button--primary.is-disabled:focus, .aw-button--primary.is-disabled:active {
  color: #FFFFFF;
  background-color: #a0cfff;
  border-color: #a0cfff;
}
.aw-button--primary.is-plain {
  color: #409EFF;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.aw-button--primary.is-plain:hover, .aw-button--primary.is-plain:focus {
  background: #409EFF;
  border-color: #409EFF;
  color: #FFFFFF;
}
.aw-button--primary.is-plain:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #FFFFFF;
  outline: none;
}
.aw-button--primary.is-plain.is-disabled, .aw-button--primary.is-plain.is-disabled:hover, .aw-button--primary.is-plain.is-disabled:focus, .aw-button--primary.is-plain.is-disabled:active {
  color: #8cc5ff;
  background-color: #ecf5ff;
  border-color: #d9ecff;
}

.aw-button--success {
  color: #FFFFFF;
  background-color: #67C23A;
  border-color: #67C23A;
}
.aw-button--success:hover, .aw-button--success:focus {
  background: #85ce61;
  border-color: #85ce61;
  color: #FFFFFF;
}
.aw-button--success:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #FFFFFF;
  outline: none;
}
.aw-button--success.is-active {
  background: #5daf34;
  border-color: #5daf34;
  color: #FFFFFF;
}
.aw-button--success.is-disabled, .aw-button--success.is-disabled:hover, .aw-button--success.is-disabled:focus, .aw-button--success.is-disabled:active {
  color: #FFFFFF;
  background-color: #b3e19d;
  border-color: #b3e19d;
}
.aw-button--success.is-plain {
  color: #67C23A;
  background: #f0f9eb;
  border-color: #c2e7b0;
}
.aw-button--success.is-plain:hover, .aw-button--success.is-plain:focus {
  background: #67C23A;
  border-color: #67C23A;
  color: #FFFFFF;
}
.aw-button--success.is-plain:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #FFFFFF;
  outline: none;
}
.aw-button--success.is-plain.is-disabled, .aw-button--success.is-plain.is-disabled:hover, .aw-button--success.is-plain.is-disabled:focus, .aw-button--success.is-plain.is-disabled:active {
  color: #a4da89;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.aw-button--warning {
  color: #FFFFFF;
  background-color: #E6A23C;
  border-color: #E6A23C;
}
.aw-button--warning:hover, .aw-button--warning:focus {
  background: #ebb563;
  border-color: #ebb563;
  color: #FFFFFF;
}
.aw-button--warning:active {
  background: #cf9236;
  border-color: #cf9236;
  color: #FFFFFF;
  outline: none;
}
.aw-button--warning.is-active {
  background: #cf9236;
  border-color: #cf9236;
  color: #FFFFFF;
}
.aw-button--warning.is-disabled, .aw-button--warning.is-disabled:hover, .aw-button--warning.is-disabled:focus, .aw-button--warning.is-disabled:active {
  color: #FFFFFF;
  background-color: #f3d19e;
  border-color: #f3d19e;
}
.aw-button--warning.is-plain {
  color: #E6A23C;
  background: #fdf6ec;
  border-color: #f5dab1;
}
.aw-button--warning.is-plain:hover, .aw-button--warning.is-plain:focus {
  background: #E6A23C;
  border-color: #E6A23C;
  color: #FFFFFF;
}
.aw-button--warning.is-plain:active {
  background: #cf9236;
  border-color: #cf9236;
  color: #FFFFFF;
  outline: none;
}
.aw-button--warning.is-plain.is-disabled, .aw-button--warning.is-plain.is-disabled:hover, .aw-button--warning.is-plain.is-disabled:focus, .aw-button--warning.is-plain.is-disabled:active {
  color: #f0c78a;
  background-color: #fdf6ec;
  border-color: #faecd8;
}

.aw-button--danger {
  color: #FFFFFF;
  background-color: #F56C6C;
  border-color: #F56C6C;
}
.aw-button--danger:hover, .aw-button--danger:focus {
  background: #f78989;
  border-color: #f78989;
  color: #FFFFFF;
}
.aw-button--danger:active {
  background: #dd6161;
  border-color: #dd6161;
  color: #FFFFFF;
  outline: none;
}
.aw-button--danger.is-active {
  background: #dd6161;
  border-color: #dd6161;
  color: #FFFFFF;
}
.aw-button--danger.is-disabled, .aw-button--danger.is-disabled:hover, .aw-button--danger.is-disabled:focus, .aw-button--danger.is-disabled:active {
  color: #FFFFFF;
  background-color: #fab6b6;
  border-color: #fab6b6;
}
.aw-button--danger.is-plain {
  color: #F56C6C;
  background: #fef0f0;
  border-color: #fbc4c4;
}
.aw-button--danger.is-plain:hover, .aw-button--danger.is-plain:focus {
  background: #F56C6C;
  border-color: #F56C6C;
  color: #FFFFFF;
}
.aw-button--danger.is-plain:active {
  background: #dd6161;
  border-color: #dd6161;
  color: #FFFFFF;
  outline: none;
}
.aw-button--danger.is-plain.is-disabled, .aw-button--danger.is-plain.is-disabled:hover, .aw-button--danger.is-plain.is-disabled:focus, .aw-button--danger.is-plain.is-disabled:active {
  color: #f9a7a7;
  background-color: #fef0f0;
  border-color: #fde2e2;
}

.aw-button--info {
  color: #FFFFFF;
  background-color: #909399;
  border-color: #909399;
}
.aw-button--info:hover, .aw-button--info:focus {
  background: #a6a9ad;
  border-color: #a6a9ad;
  color: #FFFFFF;
}
.aw-button--info:active {
  background: #82848a;
  border-color: #82848a;
  color: #FFFFFF;
  outline: none;
}
.aw-button--info.is-active {
  background: #82848a;
  border-color: #82848a;
  color: #FFFFFF;
}
.aw-button--info.is-disabled, .aw-button--info.is-disabled:hover, .aw-button--info.is-disabled:focus, .aw-button--info.is-disabled:active {
  color: #FFFFFF;
  background-color: #c8c9cc;
  border-color: #c8c9cc;
}
.aw-button--info.is-plain {
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;
}
.aw-button--info.is-plain:hover, .aw-button--info.is-plain:focus {
  background: #909399;
  border-color: #909399;
  color: #FFFFFF;
}
.aw-button--info.is-plain:active {
  background: #82848a;
  border-color: #82848a;
  color: #FFFFFF;
  outline: none;
}
.aw-button--info.is-plain.is-disabled, .aw-button--info.is-plain.is-disabled:hover, .aw-button--info.is-plain.is-disabled:focus, .aw-button--info.is-plain.is-disabled:active {
  color: #bcbec2;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
}

.aw-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.aw-button--medium.is-round {
  padding: 10px 20px;
}
.aw-button--medium.is-circle {
  padding: 10px;
}

.aw-button--small {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.aw-button--small.is-round {
  padding: 9px 15px;
}
.aw-button--small.is-circle {
  padding: 9px;
}

.aw-button--mini {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.aw-button--mini.is-round {
  padding: 7px 15px;
}
.aw-button--mini.is-circle {
  padding: 7px;
}

.aw-button--text {
  border-color: transparent;
  color: #409EFF;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
.aw-button--text:hover, .aw-button--text:focus {
  color: #66b1ff;
  border-color: transparent;
  background-color: transparent;
}
.aw-button--text:active {
  color: #3a8ee6;
  border-color: transparent;
  background-color: transparent;
}
.aw-button--text.is-disabled, .aw-button--text.is-disabled:hover, .aw-button--text.is-disabled:focus {
  border-color: transparent;
}
</style>