import {writable, derived} from 'svelte/store';

export const izels = [
    {name: '나무 이젤'},
    {name: '철제 이젤'},
]

export const subDivision = writable("");

export const clubName = writable("");

export const borrowerName = writable("");

export const rentalReason = writable("");

export const izelIdx = writable(0);
export const izelName = derived(izelIdx, ($izelIdx) => (`이젤/${izels[$izelIdx].name}`));

export const borrowTime = writable({
    date: -1, hour: -1, minute: -1
});

export const returnTime = writable({
    date: -1, hour: -1, minute: -1
});

export const borrowTimeString = derived(borrowTime, ($borrowTime) => (timeToString($borrowTime)));
export const returnTimeString = derived(returnTime, ($returnTime) => (timeToString($returnTime)));

const now = new Date();

const timeToString = ({date, hour, minute}: { date: number, hour: number, minute: number }) => {
    const tempDate = new Date(now.setDate(now.getDate() + date));
    const month = tempDate.getMonth() + 1;
    const tdate = tempDate.getDate();
    return `${month}월 ${tdate}일 ${hour < 12 ? '오전' : '오후'} ${hour % 12 ? hour % 12 : 12}시 ${minute * 10}분`
} 