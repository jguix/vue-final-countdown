import moment, { Moment } from 'moment';

export interface CounterDto {
  id: number;
  title: string;
  datetime: string;
  imgName?: string;
  imgUrl?: string;
}

export interface Counter {
  id: number;
  title: string;
  moment: Moment;
  imgName?: string;
  imgUrl?: string;
}

export const momentFromDatetime = (datetime: string): Moment =>
  moment(datetime, 'X');

export const datetimeFromMoment = (moment: Moment): string =>
  moment.format('X');

export const counterDtoFromCounter = (counter: Counter): CounterDto => {
  return {
    id: counter.id,
    title: counter.title,
    datetime: datetimeFromMoment(counter.moment),
    imgName: counter.imgName,
    imgUrl: counter.imgUrl,
  };
};

export const counterFromCounterDto = (counterDto: CounterDto): Counter => {
  return {
    id: counterDto.id,
    title: counterDto.title,
    moment: momentFromDatetime(counterDto.datetime),
    imgName: counterDto.imgName,
    imgUrl: counterDto.imgUrl,
  };
};
