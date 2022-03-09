<template>
  <div class="aw-calendar__month-picker">
    <div class="aw-calendar__input">
      <input type="input" class="aw-calendar__input-inner">
    </div>
    <div class="aw-calendar__month-wrapper">
      <div class="aw-calendar__header">
        <button class="aw-calendar__button aw-calendar__left-arrow"></button>
        <span>{{ currentYear }}</span>
        <button class="aw-calendar__button aw-calendar__right-arrow"></button>
      </div>
      <table @click="handleMonthTableClick" @mousemove="handleMouseMove" class="aw-calendar__month-table">
        <tbody>
        <tr v-for="(row, key) in rows" :key="key">
          <td v-for="(cell, key) in row" :key="key">
            <div>
              <a class="cell">{{ t('aw.datepicker.months.' + months[cell.text]) }}</a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import Locale from '../mixins/locale';
export default {
  name: 'MonthPicker',
  data () {
    return {
      months: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      tableRows: [ [], [], [] ],
      now: new Date()
    }
  },
  mixins: [Locale],
  computed: {
    rows () {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          const cell = {
            text: i * 4 + j
          }
          this.tableRows[i][j] = cell
        }
      }
      return this.tableRows;
    },
    currentYear: {
      get () {
        return this.now.getFullYear()
      },
      set (val) {
        this.now = new Date(val)
      }
    }
  },
  methods: {
    handleMonthTableClick () {},
    handleMouseMove () {},
  }
}
</script>
<style lang="less" scoped>
.aw-calendar__month-picker {
  position: relative;

}
.aw-calendar__input {
  .aw-calendar__input-inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    &:focus {
      outline: none;
      border-color: #409eff;
    }
  }
}

.aw-calendar__month-wrapper {
  position: absolute;
  top: 50px;
  left: 0;
  border: 1px solid #e4e7ed;
  padding: 0 12px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  .aw-calendar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px;
    .aw-calendar__button {
      color: #303133;
      border: 0;
      background: transparent;
      cursor: pointer;
      outline: none;
    }
    .aw-calendar__left-arrow::before {
      content: "\00AB";
      font-size: 20px;
      color: #606266;
    }
    .aw-calendar__right-arrow::before {
      content: "\00BB";
      font-size: 20px;
      color: #606266;
    }
  }
}

.aw-calendar__month-table {
  font-size: 12px;
  margin: -1px;
  border-collapse: collapse;
}
.aw-calendar__month-table td {
  text-align: center;
  padding: 8px 0px;
  cursor: pointer;
}
.aw-calendar__month-table td div {
  height: 48px;
  padding: 6px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.aw-calendar__month-table td .cell {
  width: 60px;
  height: 36px;
  display: block;
  line-height: 36px;
  color: #606266;
  margin: 0 auto;
  border-radius: 18px;
}
.aw-calendar__month-table td .cell:hover {
  color: #409EFF;
}

</style>