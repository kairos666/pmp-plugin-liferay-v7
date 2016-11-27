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
var injectExistingPortlet = function () {
    if (!$)
        throw new Error(noInitError);
    var injectPlaceholderList = $('.re-inject-portlet[data-portlet-id]');
    injectPlaceholderList.each(function (i) {
        var injectPlaceholder = $('.re-inject-portlet[data-portlet-id]').eq(i);
        var portletID = injectPlaceholder.attr('data-portlet-id');
        if (portletID && $('#' + portletID).length !== 0) {
            var originalPortlet = $('#' + portletID);
            var oldID = originalPortlet.find('.portlet').attr('id');
            originalPortlet.find('.portlet').attr('id', oldID + '_fakePortletID');
            var attributes = originalPortlet[0].attribs;
            var wrappingDiv = '<div ';
            for (var attribute in attributes) {
                var idFaking = void 0;
                (attribute === 'id' && attributes["data-fake-id"] === 'true') ? idFaking = '_fakePortletID' : '';
                wrappingDiv += attribute + '="' + attributes[attribute] + idFaking + '" ';
            }
            ;
            var content = wrappingDiv + ' >' + $('#' + portletID).html() + '</div>';
            injectPlaceholder.addClass('processed').after(content);
        }
    });
    $('.re-inject-portlet.processed').remove();
};
module.exports = {
    init: init,
    killAUI: killAUI,
    AUIRemoveUse: AUIRemoveUse,
    injectExistingPortlet: injectExistingPortlet
};
