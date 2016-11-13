var noInitError = 'Need to init the plugin before usage';
var $;
var init = function (jQuery) {
    $ = jQuery;
};
var killAUI = function () {
    if (!$)
        throw new Error(noInitError);
    $('script').each(function () {
        if (this.children && this.children[0] && this.children[0].data) {
            if (this.children[0].data.indexOf('AUI().use(') !== -1) {
                this.children[0].data = '/* killed scripts */';
            }
        }
    });
};
var AUIRemoveUse = function (moduleName, removePattern) {
    if (!$)
        throw new Error(noInitError);
    $('script').each(function () {
        if (this.children && this.children[0] && this.children[0].data) {
            if (this.children[0].data.indexOf('AUI().use(') !== -1) {
                this.children[0].data = this.children[0].data.replace('("' + moduleName + '",', '(');
                this.children[0].data = this.children[0].data.replace(',"' + moduleName + '"', '');
                this.children[0].data = this.children[0].data.replace(removePattern, '');
            }
        }
    });
};
module.exports = {
    init: init,
    killAUI: killAUI,
    AUIRemoveUse: AUIRemoveUse
};
