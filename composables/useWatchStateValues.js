export function useWatchStateValues (propData, as_array = true) {
    return Object.keys(propData).map((item) => {
        if (propData[item] instanceof Object && 'val' in propData[item]){
            if (as_array){
                return propData[item].val;
            }else{
                return {item: propData[item].val};
            }
        }
    });
}