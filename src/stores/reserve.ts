import { writable } from 'svelte/store';

export const subDivision = writable("");

export const clubName = writable("");

export const borrowerName = writable("");

export const rentalReason = writable("");

export const borrowTime = writable({
    dateIdx: 0,
    hourIdx: 0,
    minuteIdx: 0,
});

export const retrunTime = writable({
    dateIdx: 0,
    hourIdx: 0,
    minuteIdx: 0,
});