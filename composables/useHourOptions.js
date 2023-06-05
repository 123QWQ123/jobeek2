export function useHourOptions() {
    const items = [];
    for (let i = 0; i <= 23; i++){
        items.push({name: `${i}`.padStart(2, '0') + ':00', value: `${i}`.padStart(2, '0') + ':00'});
    };
    return items;
}