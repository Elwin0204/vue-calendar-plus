# vue-calendar-plus
A vue component for calendar functions

# Attributes
| props | description | type | optional value | default |
| :-----| :----- | :----- | :----- | :----- |
| value/v-model | 绑定值 | Array | - | - |
| first-day-of-week | 周起始日 | Number | 1 到 7 | 7 |
| mode | 模式：单选/多选/范围选择 | String | single/multiple/range | single |

# dateCell scoped slot 参数
| params | description | type | optional value | default |
| :-----| :----- | :----- | :----- | :----- |
| date | 单元格代表的日期 | Date | - | - |
| data | { type, isSelected, day}，type 表示该日期的所属月份，可选值有 prev-month，current-month，next-month；isSelected 标明该日期是否被选中；day 是格式化的日期，格式为 yyyy-MM-dd	Object | Object | -  | - |