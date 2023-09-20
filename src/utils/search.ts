export default function show(data: any, query: string, target = '') {
    if (!query) return true;
    const field = target.split(';');
    for (const f of field) {
        const value = data[f];
        if (typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())) return true;
    }
    return false;
}