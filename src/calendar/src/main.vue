<template>
  <div class="aw-calendar">
    <div class="aw-calendar__header">
      <div class="aw-calendar__title">
        <MonthPicker
          :placeholder="placeholder"
          @pickMonth="changeDate" />
      </div>
      <div class="aw-calendar__date">
        <slot :date="curMonthDatePrefix"></slot>
        <template v-if="!$scopedSlots.default">{{ curMonthDatePrefix }}</template>
      </div>
      <div class="aw-calendar__button-group">
        <aw-button-group>
          <aw-button
            type="text"
            size="mini"
            @click="selectedDate('prev-month')"
          >
          {{ t('aw.datepicker.prevMonth') }}
          </aw-button>
          <aw-button
            type="text"
            size="mini"
            @click="selectedDate('today')"
          >
          {{ t('aw.datepicker.today') }}
          </aw-button>
          <aw-button
            type="text"
            size="mini"
            @click="selectedDate('next-month')"
          >
          {{ t('aw.datepicker.nextMonth') }}
          </aw-button>
          <aw-button
            type="text"
            size="mini"
            @click="clearSelectedDate"
          >
          {{ t('aw.datepicker.clearSelected') }}
          </aw-button>
        </aw-button-group>
      </div>
    </div>
    <div class="aw-calendar__body">
      <date-table
        :date="date"
        :selected-day="realSelectedDay"
        :firstDayOfWeek="firstDayOfWeek"
        @pick="pickDay"
      />
    </div>
  </div>
</template>
<script>
import DateTable from "./DateTable";
import fecha from '../utils/date';
import Locale from '../mixins/locale';
import AwButton from './button';
import AwButtonGroup from './button-group';
import MonthPicker from './MonthPicker.vue';

const validTypes = ['prev-month', 'today', 'next-month'];

export default {
  name: 'AwCalendar',
  componentName: 'AwCalendar',
  components: {
    DateTable,
    AwButton,
    AwButtonGroup,
    MonthPicker
  },
  mixins: [Locale],
  props: {
    mode: {
      type: String,
      default: 'single'
    },
    value: {
      type: Array,
      default: () => []
    },
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    placeholder: String
  },
  provide () {
    return {
      AwCalendar: this
    }
  },
  data () {
    return {
      selectedDay: [],
      now: new Date(),
      current: '',
    }
  },
  computed: {
    realFirstDayOfWeek () {
      if (this.firstDayOfWeek < 1 || this.firstDayOfWeek > 6) {
        return 0;
      }
      return Math.floor(this.firstDayOfWeek);
    },
    formatedDate () {
      return fecha.format(this.date, 'yyyy-MM-dd');
    },
    formatedToday () {
      return fecha.format(this.now, 'yyyy-MM-dd');
    },
    realSelectedDay: {
      get () {
        return this.selectedDay;
      },
      set (val) {
        this.selectedDay = val;
        const dateList = this.selectedDay.map(day => new Date(day));
        this.$emit('input', dateList);
      }
    },
    date () {
      if (!this.current) {
        return this.now;
      } else {
        return this.toDate(this.current);
      }
    },
    prevMonthDatePrefix() {
      const temp = new Date(this.date.getTime());
      temp.setDate(0);
      return fecha.format(temp, 'yyyy-MM');
    },

    curMonthDatePrefix() {
      return fecha.format(this.date, 'yyyy-MM');
    },

    nextMonthDatePrefix() {
      const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
      return fecha.format(temp, 'yyyy-MM');
    },
  },
  methods: {
    pickDay (day) {
      if (this.mode === 'single') {
        this.realSelectedDay = [day];
      } else if (this.mode === 'multiple') {
        const realSelectedDayCopy = [ ...this.realSelectedDay ];
        if (!realSelectedDayCopy.includes(day)) {
          this.realSelectedDay = [ ...realSelectedDayCopy, day ]
        } else {
          this.realSelectedDay = realSelectedDayCopy.filter(item => item !== day);
        }
      } else if (this.mode === 'range') {
        const { min, max } = this.findMinAndMaxDay(this.realSelectedDay);
        const timestamp = new Date(day).getTime();
        if (timestamp < min ) {
          this.realSelectedDay = this.generateRangeDay(timestamp, max);
        }
        if (timestamp > max) {
          this.realSelectedDay = this.generateRangeDay(min, timestamp);
        }
        if (timestamp > min && timestamp < max) {
          this.realSelectedDay = this.generateRangeDay(min, timestamp);
        }
      } else {
        console.warn('props params mode is incorrent, please select in single, multiple or range, default is single')
      }
      console.log('real', this.realSelectedDay);
    },
    toDate (val) {
      if (!val) {
        throw new Error('invalid val');
      }
      return val instanceof Date ? val : new Date(val);
    },
    selectedDate (type) {
      console.log(type)
      if (validTypes.indexOf(type) === -1) {
        throw new Error(`invalid type ${type}`);
      }
      let day = '';
      if (type === 'prev-month') {
        day = `${this.prevMonthDatePrefix}-01`;
      } else if (type === 'next-month') {
        day = `${this.nextMonthDatePrefix}-01`;
      } else {
        day = this.formatedToday;
      }

      if (day === this.formatedDate) return;
      this.current = day;
      console.log('real', this.realSelectedDay);
    },
    clearSelectedDate () {
      this.realSelectedDay = [];
    },
    findMinAndMaxDay (dayArr) {
      const timestampArr = dayArr.map(day => new Date(day).getTime());
      let min = timestampArr[0], max = timestampArr[0]
      for (let i = 0; i < timestampArr.length; i++) { 
        if (min > timestampArr[i]) {
          min = timestampArr[i];
        }
        if (max < timestampArr[i]) {
          max = timestampArr[i];
        }
      }
      return { min, max };
    },
    generateRangeDay (from, to) {
      const delta = 24 * 3600 * 1000;
      let timestamp = from;
      const dayArr = [];
      while (timestamp <= to) {
        dayArr.push(fecha.format(new Date(timestamp), 'yyyy-MM-dd'));
        timestamp += delta;
      }
      return dayArr;
    },
    changeDate ({ year, month }) {
      this.current =  new Date(year, month, 1);
    }
  },
  created () {
    this.realSelectedDay = [this.formatedToday];
  }
}
</script>
<style lang="less" scoped>
.aw-calendar {
  background-color: #fff;
}
.aw-calendar__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #EBEEF5;
}

.aw-calendar__title {
  color: #000000;
  -ms-flex-item-align: center;
  align-self: center;
}

.aw-calendar__body {
  padding: 12px 20px 35px;
}
</style>