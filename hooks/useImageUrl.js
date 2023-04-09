const useImageUrl = (path, host = null) => {
    if (!host){
        host = import.meta.url;
    }
    return new URL(path, host);
};
export default useImageUrl;