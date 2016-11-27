# pmp-plugin-liferay-v7
Pimp My Page plugin - contains liferay 7 helpers

## JS Helpers

- **helpers.lfr7.killAUI()** prevents AUI to work in the page   

- **helpers.lfr7.AUIRemoveUse(moduleName, removePattern)** prevent specific AlloyUI modules to be loaded/executed  
required param *moduleName* the AUI module name [string]  
required param *removePattern* the string to erase for preventing module execution [string]  

- **helpers.lfr7.injectExistingPortlet()** move around existing portlet to some other location  

## HTML Helpers

### portlet
generate portlet skin in a liferay 7 fashion to wrap content
```html
<!-- default | will provide a fake title and default skin type (decorate)-->
<portlet>...insert HTML content here...</portlet>
<!-- portlet with decorated skin -->
<portlet content-title="portlet custom title" application-decorators="decorate">...insert HTML content here...</portlet>
<!-- portlet with borderless skin -->
<portlet content-title="portlet custom title" application-decorators="borderless">...insert HTML content here...</portlet>
<!-- portlet with barebone skin -->
<portlet content-title="portlet custom title" application-decorators="barebone">...insert HTML content here...</portlet>
```

### lfr-layout-container, lfr-row, lfr-column
generate page layout wrapper in a liferay 7 fashion. This tag should be used in conjunction with lfr-row and lfr-column to build a grid layout for the page.  
Depending on the configuration of rows and columns provided, the layout will automatically append Liferay' specific classes ('empty', 'only', 'first', ...)  
```html
<!-- default | you can provide additional CSS classes via 'add-classes' attribute-->
<lfr-layout-container></lfr-layout-container>
<!-- example of real usage for grid layout | first row (2 columns) & second row (3 columns) -->
<lfr-layout-container add-classes="layout-homepage">
    <lfr-row>
        <lfr-column add-classes="col-33">...insert <portlet>s here...</lfr-column>
        <lfr-column add-classes="col-66">...insert <portlet>s here...</lfr-column>
    </lfr-row>
    <lfr-row>
        <lfr-column add-classes="col-33">...insert <portlet>s here...</lfr-column>
        <lfr-column add-classes="col-33">...insert <portlet>s here...</lfr-column>
        <lfr-column add-classes="col-33">...insert <portlet>s here...</lfr-column>
    </lfr-row>
</lfr-layout-container>
```

### re-inject-portlet
relocate a portlet into the page. This helper tag is useful for targeting a portlet by ID and move it to the tag position.  
```html
<!-- default | will provide a fake title and default skin type (decorate)-->
<portlet>...insert HTML content here...</portlet>
<!-- portlet with decorated skin -->
<portlet content-title="portlet custom title" application-decorators="decorate">...insert HTML content here...</portlet>
<!-- portlet with borderless skin -->
<portlet content-title="portlet custom title" application-decorators="borderless">...insert HTML content here...</portlet>
<!-- portlet with barebone skin -->
<portlet content-title="portlet custom title" application-decorators="barebone">...insert HTML content here...</portlet>
```
