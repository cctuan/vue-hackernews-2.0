
export const isFBWebView = () => {
    const userAgent = navigator ? navigator.userAgent : '' 
    return /fbid|fbios|fblc|fb_iab|fb4a|fbav/.test(userAgent); 
}
