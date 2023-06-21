export function useWatchStateValues (propData) {
    return Object.keys(propData).map((item) => {
        if (propData[item] instanceof Object && 'val' in propData[item]){
            return propData[item].val;
        }
    });
}