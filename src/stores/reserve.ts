import { writable, derived } from 'svelte/store';

export const izels = [
    {name: '나무 이젤'},
    {name: '철제 이젤'},
]

export const subDivision = writable("");

export const clubName = writable("");

export const borrowerName = writable("");

export const rentalReason = writable("");

export const izelIdx = writable(0);
export const izelName = derived(izelIdx, ($izelIdx)=>(`이젤/${izels[$izelIdx].name}`));

export const borrowTime = writable({
    dateIdx: 0,
    hourIdx: 0,
    minuteIdx: 0,
});

export const returnTime = writable({
    dateIdx: 0,
    hourIdx: 0,
    minuteIdx: 0,
});

export const borrowTimeString = derived(borrowTime, ($borrowTime) => (timeToString($borrowTime)));
export const returnTimeString = derived(returnTime, ($returnTime) => (timeToString($returnTime)));

const now = new Date();

const timeToString = ({dateIdx, hourIdx, minuteIdx}:{dateIdx:number, hourIdx:number, minuteIdx:number}) => {
    const tempDate = new Date(now.setDate(now.getDate()+dateIdx));
    const month = tempDate.getMonth()+1;
    const date = tempDate.getDate();
    return `${month}월 ${date}일 ${hourIdx<12 ? '오전': '오후'} ${hourIdx%12 ? hourIdx%12:12}시 ${minuteIdx*10}분`
} 