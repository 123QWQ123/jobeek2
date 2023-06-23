export function useYearOptions(start = null, end = null, reverse = true) {
    const items = [];
    if (!start){
        start = (new Date).getFullYear() - 50;
    }
    if (!end){
        end = (new Date).getFullYear();
    }
    for (let i = start; i <= end; i++){
        items.push({name: i, value: i});
    }
    if (reverse){
        items.reverse();
    }
    return items;
}