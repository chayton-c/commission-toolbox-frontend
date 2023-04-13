import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wechatDatePipe'
})
export class WechatDatePipe implements PipeTransform {
  transform(value: Date): string {
    const now = new Date();
    const dayOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const hour = value.getHours();
    const minute = value.getMinutes();
    const dayDiff = (now.getTime() - value.getTime()) / (1000 * 3600 * 24);
    let dateString: string;

    if (dayDiff < 1) {
      dateString = '今天';
    } else if (dayDiff < 2) {
      dateString = '昨天';
    } else if (dayDiff < 7) {
      dateString = dayOfWeek[value.getDay()];
    } else {
      const month = value.getMonth() + 1;
      const day = value.getDate();
      dateString = `${month}月${day}日`;
    }

    dateString += ' ';

    if (hour < 12) {
      dateString += '上午 ';
    } else {
      dateString += '下午 ';
    }

    const hour12 = hour > 12 ? hour - 12 : hour;
    dateString += `${hour12}:${minute.toString().padStart(2, '0')}`;

    return dateString;
  }
}
