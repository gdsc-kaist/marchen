import { writable } from 'svelte/store';

export const subDivision = writable("");

export const clubName = writable("");

export const borrowerName = writable("");

export const rentalReason = writable("");

export const borrowTime = writable({
    date: 0,
    hour: 0,
    minute: 0,
});

export const retrunTime = writable({
    date: 0,
    hour: 0,
    minute: 0,
});