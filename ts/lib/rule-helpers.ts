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

/**
 * move around existing portlet to some other location
 */
let injectExistingPortlet = ():void => {
    if(!$) throw new Error(noInitError);

    let injectPlaceholderList       = $('.re-inject-portlet[data-portlet-id]');
    injectPlaceholderList.each(function(i){
        //iterate throught placeholders
        let injectPlaceholder       = $('.re-inject-portlet[data-portlet-id]').eq(i);
        let portletID               = injectPlaceholder.attr('data-portlet-id');

        if(portletID && $('#'+ portletID).length !== 0) {
            let originalPortlet     = $('#'+ portletID);
            
            //customize ID
            var oldID = originalPortlet.find('.portlet').attr('id');
            originalPortlet.find('.portlet').attr('id', oldID + '_fakePortletID');
            
            //recreate wrapper tag (customize ID)
            var attributes        = originalPortlet[0].attribs;
            var wrappingDiv       = '<div ';
            for(let attribute in attributes) {
                let idFaking;
                (attribute === 'id' && attributes["data-fake-id"] === 'true') ? idFaking = '_fakePortletID' : '';
                wrappingDiv += attribute + '="' + attributes[attribute] + idFaking + '" ';
            };
            let content = wrappingDiv + ' >' + $('#'+ portletID).html() + '</div>';
            injectPlaceholder.addClass('processed').after(content);
        }
    });
    $('.re-inject-portlet.processed').remove();
}

module.exports = {
    init: init,
    killAUI: killAUI,
    AUIRemoveUse: AUIRemoveUse,
    injectExistingPortlet: injectExistingPortlet
}
