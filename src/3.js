module.exports = function aa(){
    function getData(){
        Promise.resolve({a:1,b:2}).then(res=>{
            trackFn(res)
        })
    }
    /**
     * @track
     * @param 'click',param 
     * @returns 
     * @aa 
     */
    function trackFn(param){
        console.log('cc');
    }
}