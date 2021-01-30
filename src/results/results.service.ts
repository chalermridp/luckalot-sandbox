import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ResultsService {
  private LUCKALOT_API_HOST =
    process.env.LUCKALOT_API_HOST || 'http://localhost:3001';
  private LUCKALOT_SANOOK_API_HOST =
    process.env.LUCKALOT_SANOOK_API_HOST || 'http://localhost:3002';
  private RESULT_TYPE_LENGTH = 173;

  async importFromBeginning() {
    // const beginDate = new Date('2006-12-30');
    const beginDate = new Date('2017-05-17');
    // const beginDate = new Date('2021-01-17');
    // const endDate = new Date('2007-02-01');
    // const beginDate = new Date('2007-10-16'); //*** */

    // const beginDate = new Date('2008-08-16');
    const endDate = new Date('2021-01-17');
    // const eligibleDates = [29, 30, 31, 1, 2, 15, 16, 17];
    while (beginDate <= endDate) {
      // if (eligibleDates.indexOf(beginDate.getDate())) {
      const date = beginDate.toISOString().substring(0, 10);
      const url1 = `${this.LUCKALOT_SANOOK_API_HOST}/results/${date}`;
      const response1 = await axios.get(url1);
      if (response1.data.length === this.RESULT_TYPE_LENGTH) {
        if (!isNaN(response1.data[0].value)) {
          const results = response1.data.map((value) => {
            if (isNaN(value.value)) {
              value.value = `unk_${this.randomString(6)}`;
            }
            value.created_by = 'luckalot.sandbox';
            return value;
          });

          const url2 = `${this.LUCKALOT_API_HOST}/results/${date}/bulk`;
          const response2 = axios.post(url2, results);
          console.log(date);
        }
      }
      // }

      beginDate.setDate(beginDate.getDate() + 1);
    }
  }

  randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
