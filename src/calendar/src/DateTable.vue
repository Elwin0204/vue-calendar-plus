<script>
import fecha from '../utils/date';
import { range as rangeArr, getFirstDayOfMonth, getPrevMonthLastDays, getMonthDays, getI18nSettings, validateRangeInOneMonth } from '../utils/date-util';

const WEEK_DAYS = getI18nSettings().dayNames;
export default {
  name: 'DateTable',
  props: {
    selectedDay: Array,
    date: Date,
    hideHeader: {
      type: Boolean,
      default: false
    },
    firstDayOfWeek: Number
  },
  inject: ['AwCalendar'],
  computed: {
    weekDays () {
      const start = this.firstDayOfWeek;
      if (typeof start !== 'number' || start === 0) {
        return WEEK_DAYS.slice();
      } else {
        return WEEK_DAYS.slice(start).concat(WEEK_DAYS.slice(0, start));
      }
    },
    rows () {
      let days = [];
      const date = this.date;
      let firstDay =  getFirstDayOfMonth(date);
      firstDay = firstDay === 0 ? 7 : firstDay;
      const firstDayOfWeek = typeof this.firstDayOfWeek === 'number' ? this.firstDayOfWeek : 1;
      const amount = firstDay - firstDayOfWeek >= 0 ? firstDay - firstDayOfWeek : firstDay - firstDayOfWeek + 7;
      const prevMonthDays = getPrevMonthLastDays(date, amount).map(day => ({
        text: day,
        type: 'prev'
      }));
      const currentMonthDays = getMonthDays(date).map(day => ({
        text: day,
        type: 'current'
      }));
      days = [ ...prevMonthDays, ...currentMonthDays ];
      const nextMonthDays = rangeArr(42 - days.length).map((_, index) => ({
        text: index + 1,
        type: 'next'
      }));
      days = days.concat(nextMonthDays);
      return this.toNestedArr(days);
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
    formatedToday() {
      return this.AwCalendar.formatedToday;
    }
  },
  methods: {
    toNestedArr (days) {
      return rangeArr(days.length / 7).map((_, index) => {
        const start = index * 7;
        return days.slice(start, start + 7);
      });
    },
    getFormateDate(day, type) {
      if (!day || ['prev', 'current', 'next'].indexOf(type) === -1) {
        throw new Error('invalid day or type');
      }
      let prefix = this.curMonthDatePrefix;
      if (type === 'prev') {
        prefix = this.prevMonthDatePrefix;
      } else if (type === 'next') {
        prefix = this.nextMonthDatePrefix;
      }
      day = `00${day}`.slice(-2);
      return `${prefix}-${day}`;
    },
    cellRenderProxy ({ text, type }) {
      let render = this.AwCalendar.$scopedSlots.dateCell;
      if (!render) return <span>{ text }</span>;

      const day = this.getFormateDate(text, type);
      const date = new Date(day);
      const data = {
        isSelected: this.selectedDay.includes(day),
        type: `${type}-month`,
        day
      };
      return render({ date, data });
    },
    getCellClass({ text, type}) {
      const classes = [type];
      if (type === 'current') {
        const date = this.getFormateDate(text, type);
        if (this.selectedDay.includes(date)) {
          classes.push('is-selected');
        }
        if (date === this.formatedToday) {
          classes.push('is-today');
        }
      }
      return classes;
    },
    pickDay ({ text, type }) {
      const date = this.getFormateDate(text, type);
      this.$emit('pick', date);
    }
  },
  render () {
    const thead = this.hideHeader ? null : (<thead>
      { this.weekDays.map(day => <th key={day}>{day}</th>) }
    </thead>);
    return (
      <table
        class={{
          'aw-calendar-table': true
        }}
        cellspacing="0"
        cellpadding="0"
      >
        { thead }
        <tbody>
          { this.rows.map((row, index) => <tr
            class={{
              'aw-calendar-table__row': true,
              'aw-calendar-table__row--high-border' : index === 0 && this.hideHeader
            }}
            key={index}
          >
            {
              row.map((cell, key) => <td
                key={key}
                class={ this.getCellClass(cell) }
                onClick={ this.pickDay.bind(this, cell) }
              >
                <div class="aw-calendar-day">
                  { this.cellRenderProxy(cell) }
                </div>
              </td>)
            }
          </tr>) }
        </tbody>
      </table>
    )
  }
}
</script>

<style lang="less" scoped>
.aw-calendar-table {
  table-layout: fixed;
  width: 100%;
}
.aw-calendar-table thead th {
  padding: 12px 0;
  color: #606266;
  font-weight: normal;
}
.aw-calendar-table:not(.is-range) td.prev,
.aw-calendar-table:not(.is-range) td.next {
  color: #C0C4CC;
}
.aw-calendar-table td {
  border-bottom: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
  -webkit-transition: background-color 0.2s ease;
  transition: background-color 0.2s ease;
  text-align: center;
  vertical-align: middle;
}
.aw-calendar-table td div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.aw-calendar-table td.is-selected {
  color: #fff;
  background-color: #409eff;
}

.aw-calendar-table td.is-today {
  color: #FF3030;
}

.aw-calendar-table tr:first-child td {
  border-top: 1px solid #EBEEF5;
}
.aw-calendar-table tr td:first-child {
  border-left: 1px solid #EBEEF5;
}
.aw-calendar-table tr.aw-calendar-table__row--hide-border td {
  border-top: none;
}
.aw-calendar-table .aw-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  height: 85px;
}
.aw-calendar-table .aw-calendar-day:hover {
  cursor: pointer;
  background-color: #409eff;
}
</style>