const noInitError               = 'Need to init the plugin before usage';

// declare cheerio's Jquery light version
let $;

/**
 * init function to set up jQuery light reference
 * 
 * @param jQuery reference
 */
let init = jQuery => {
    $ = jQuery;
};

/**
 * kill AlloyUI - prevents AUI to work in the page
 */
let killAUI = function(){
    if(!$) throw new Error(noInitError);

    $('script').each(function(){
        //test for anonymous script tag structure
        if(this.children && this.children[0] && this.children[0].data){
            //search for bundle call
            if(this.children[0].data.indexOf('AUI().use(') !== -1) {
                this.children[0].data = '/* killed scripts */';
            }
        }
    });
}

/**
 * prevent specific AlloyUI modules to be loaded/executed
 * 
 * @param moduleName - the AUI module name [string]
 * @param removePattern - the string to erase for preventing module execution [string]
 */
let AUIRemoveUse = function(moduleName:string, removePattern:string):void {
    if(!$) throw new Error(noInitError);
    
    $('script').each(function(){
        //test for anonymous script tag structure
        if(this.children && this.children[0] && this.children[0].data){
            //search for bundle call
            if(this.children[0].data.indexOf('AUI().use(') !== -1) {
                //if first module required
                this.children[0].data = this.children[0].data.replace('("' + moduleName + '",', '(');
                //other
                this.children[0].data = this.children[0].data.replace(',"' + moduleName + '"', '');
                
                //remove constructor call
                this.children[0].data = this.children[0].data.replace(removePattern , '');
            }
        }
    });
}

module.exports = {
    init: init,
    killAUI: killAUI,
    AUIRemoveUse: AUIRemoveUse
}
