<template>
  <div class="aw-calendar__month-picker" v-clickoutside="() => isHidden = true">
    <div class="aw-calendar__input">
      <input
        :value="selectedTime"
        @focus="isHidden = false"
        type="input"
        class="aw-calendar__input-inner">
      <i
        v-show="selectedTime"
        class="aw-calendar__clear"
        @click="clearSelectedTime">
        <svg t="1646927087170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2187" width="16" height="16"><path d="M1007.983211 512c0-273.924743-222.059492-495.984235-495.983211-495.984235S16.016789 238.075257 16.016789 512s222.059492 495.984235 495.984235 495.984235c113.738437 0 221.667565-38.428218 308.796972-107.830891 10.45205-8.325619 12.175297-23.547299 3.849678-33.998325-8.325619-10.45205-23.547299-12.175297-33.998325-3.849678-78.636988 62.638619-175.962617 97.290837-278.648324 97.290837-247.200078 0-447.595154-200.395076-447.595154-447.595154S264.799922 64.404846 512 64.404846s447.595154 200.395076 447.595154 447.595154c0 84.755336-23.572882 165.977195-67.401086 236.329497-7.065929 11.341303-3.598968 26.263154 7.742335 33.329083 11.341303 7.065929 26.263154 3.598968 33.329083-7.742335C981.841831 695.941336 1007.983211 605.866854 1007.983211 512zM524.260232 537.694195 371.999432 692.738387c-9.362228 9.534144-24.681122 9.67229-34.214243 0.310062-9.533121-9.362228-9.67229-24.681122-0.310062-34.214243l152.875806-155.669432L337.475128 347.495342c-9.362228-9.534144-9.224082-24.852014 0.310062-34.214243 9.534144-9.362228 24.852014-9.224082 34.214243 0.310062l152.260799 155.044192 152.261822-155.044192c9.362228-9.534144 24.681122-9.67229 34.214243-0.310062 9.533121 9.362228 9.67229 24.681122 0.310062 34.214243L558.170552 503.164774l152.875806 155.669432c9.362228 9.533121 9.224082 24.852014-0.310062 34.214243-9.534144 9.362228-24.852014 9.224082-34.214243-0.310062L524.260232 537.694195z" p-id="2188" fill="#707070"></path></svg>
      </i>
    </div>
    <transition name="fade">
      <div
        v-show="!isHidden"
        class="aw-calendar__month-wrapper">
        <div class="aw-calendar__header">
          <button
            class="aw-calendar__button aw-calendar__left-arrow"
            @click="setCurrentYear('prev')"></button>
          <span>{{ `${currentYear}年` }}</span>
          <button
            class="aw-calendar__button aw-calendar__right-arrow"
            @click="setCurrentYear('next')"></button>
        </div>
        <table @click="handleMonthTableClick" @mousemove="handleMouseMove" class="aw-calendar__month-table">
          <tbody>
          <tr v-for="(row, key) in rows" :key="key">
            <td v-for="(cell, key) in row" :key="key">
              <div>
                <a :class="{'cell': true, 'is-selected': currentMonth === cell.text}">{{ t('aw.datepicker.months.' + months[cell.text]) }}</a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>
<script>
import Locale from '../mixins/locale';
import clickoutside from '../utils/clickoutside';
import fecha from '../utils/date';
export default {
  name: 'MonthPicker',
  data () {
    return {
      months: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      tableRows: [ [], [], [] ],
      now: new Date(),
      isHidden: true,
      selectedTime: '',
      month: ''
    }
  },
  mixins: [Locale],
  directives: {
    clickoutside
  },
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
    },
    currentMonth: {
      get () {
        return this.month
      },
      set (val) {
        this.month = val
      }
    }
  },
  methods: {
    getMonthDate (month) {
      const temp = new Date(this.currentYear, month, 1);
      return fecha.format(temp, 'yyyy-MM');
    },
    getPrevYear () {
      return this.now.getFullYear() - 1 + '';
    },
    getNextYear () {
      return this.now.getFullYear() + 1 + '';
    },
    handleMonthTableClick (e) {
      let target = e.target;
      if (target.tagName === 'A') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;
      const column = target.cellIndex;
      const row = target.parentNode.rowIndex;
      const month = row * 4 + column;
      this.currentMonth = month;
      this.selectedTime = this.getMonthDate(month);
      this.isHidden = true;
      this.$emit('pickMonth', month)
    },
    setCurrentYear (type) {
      if (type === 'prev') {
        this.currentYear = this.getPrevYear();
        return
      }
      if (type === 'next') {
        this.currentYear = this.getNextYear();
      }
    },
    clearSelectedTime () {
      this.selectedTime = '';
      this.currentMonth = '';
      this.isHidden = true;
    },
    handleMouseMove () {},
  }
}
</script>
<style lang="less" scoped>
.aw-calendar__month-picker {
  position: relative;

}
.aw-calendar__input {
  position: relative;
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
  .aw-calendar__clear {
    position: absolute;
    top: 12px;
    right: 8px;
    cursor: pointer;
    visibility: hidden;
  }
  &:hover .aw-calendar__clear {
    visibility: visible;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
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
.aw-calendar__month-table td .cell.is-selected {
  color: #409EFF;
}

</style>