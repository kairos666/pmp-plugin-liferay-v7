import React from 'react';

/*** helpers ***/
var testWrongDirectChild = function(childType, children){
  var result = false;
  React.Children.map(children, function(child) {
    //check if layout container are only childType [class name]
    if(child.type && child.type.name !== childType) result = true;
  });
  
  return result;
}
var testWrongColumnDirectChild = function(children){
  var result = false;
  React.Children.map(children, function(child) {
    //check if layout container are only childType [class name]
    if(child.type && child.type.name !== 'Portlet' && child.type.name !== 'ReInjectPortlet') result = true;
  });
  
  return result;
};
var hasDirectChildType = function(childType, children){
  var result = false;
  React.Children.map(children, function(child) {
    //check if layout container are only childType [class name]
    if(child.type && child.type.name === childType) result = true;
  });
  
  return result;
}
var directChildCount = function(childType, children){
  var result = 0;
  React.Children.map(children, function(child) {
    if(child.type && child.type.name === childType) result++
  });
  
  return result;
}
var columnRelativePrefixFinder = function(columnIndex, columnTotalInRow){
  //only
  if(columnTotalInRow == 1) return 'only';
  //first
  if(columnTotalInRow >= 2 && columnIndex == 1) return 'first';
  //last
  if(columnTotalInRow >= 2 && columnIndex == columnTotalInRow) return 'last';
  //otherwise
  return '';
}
/***************************************************************
      LFR LAYOUT CONTAINER
***************************************************************/
const lfrLayoutContainer = class LfrLayoutContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var wrongChild = testWrongDirectChild('LfrRow', this.props.children);
    var columnCount = 1;
    var rowChildrenUpdatedProps = []
    
    //column index setting
    React.Children.map(this.props.children, function(child) {
      if(child.type && child.type.name === 'LfrRow' && child.props && child.props.children) {
        var columnChildrenUpdatedProps = [];
        var columnLocalTotal = directChildCount('LfrColumn', child.props.children);
        var columnLocalCount = 1;
        React.Children.map(child.props.children, function(subChild) {
         //check only lfr-columns
         if(subChild.type && subChild.type.name === 'LfrColumn') {
           //inside layout column
           var newProps = {
             columnIndex: columnCount,
             columnRelativeSetting: columnRelativePrefixFinder(columnLocalCount, columnLocalTotal)
           }
           columnChildrenUpdatedProps.push(React.cloneElement(subChild, newProps));
           columnCount++;
           columnLocalCount++;
         } else {
           columnChildrenUpdatedProps.push(subChild);
         }
        });
        rowChildrenUpdatedProps.push(React.cloneElement(child, { updatedChildren: columnChildrenUpdatedProps }));
      } else {
        rowChildrenUpdatedProps.push(child);
      }
    });
    
    return (
       <div className={this.props['add-classes']} id="main-content" role="main">
          {wrongChild ? <p className="alert alert-warning">lfr-layout-container accepts only lfr-row for direct child</p> : null}
          {rowChildrenUpdatedProps}
       </div>
    );
  }
}

/***************************************************************
      LFR ROW
***************************************************************/
const lfrRow = class LfrRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var wrongChild = testWrongDirectChild('LfrColumn', this.props.children);
    
    return (
       <div className="portlet-layout row">
          {wrongChild ? <p className="alert alert-warning">lfr-row accepts only lfr-columns for direct child</p> : null}
          {this.props.updatedChildren}
       </div>
    );
  }
}

/***************************************************************
      LFR COLUMN
***************************************************************/
const lfrColumn = class LfrColumn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var wrongChild            = testWrongColumnDirectChild(this.props.children);
    var emptyColumn           = (hasDirectChildType('Portlet', this.props.children) || hasDirectChildType('ReInjectPortlet', this.props.children)) ? '' : ' empty';
    var dynamicClasses        = (this.props.columnRelativeSetting !== '') ? 'portlet-column-' + this.props.columnRelativeSetting : '';
    var dynamicInnerClasses   = (this.props.columnRelativeSetting !== '') ? 'portlet-column-content-' + this.props.columnRelativeSetting : '';
    var classes               = this.props['add-classes'] + ' portlet-column ' + dynamicClasses + ' yui3-dd-drop';
    var innerClasses          = 'portlet-dropzone portlet-column-content ' + dynamicInnerClasses + emptyColumn ;
    return (
       <div className={classes} id={"column-" + this.props.columnIndex}>
          <div className={innerClasses} id={"layout-column_column-" + this.props.columnIndex}>
            {wrongChild ? <p className="alert alert-warning">lfr-column accepts only portlet for direct child</p> : null}
            {this.props.children}
          </div>
       </div>
    );
  }
}

/***************************************************************
      PORTLET
***************************************************************/
const portlet = class Portlet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var portletType = (this.props['portlet-type']) ? " portlet-" + this.props['portlet-type'] : '';
    return (
      <div className={"portlet-boundary portlet-" + this.props['application-decorators'] + portletType + " yui3-dd-drop portlet-draggable"} {...this.props}>
        <section className="portlet">
          <header className="portlet-topper">
            <div className="portlet-title-default"> 
              <span className="portlet-name-text">fake portlet</span> 
            </div>
            <menu className="portlet-topper-toolbar" type="toolbar"></menu>
          </header>
          <div className="portlet-content">
            <h2 className="portlet-title-text portlet-title-editable">{this.props['content-title']}</h2>
            <div className=" portlet-content-container">
              <div className="portlet-body">
               {this.props.children}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
portlet.defaultProps = {
  "content-title"               : 'fake title',
  "application-decorators"      : 'decorate'
};

/***************************************************************
      RE INJECT LFR PORTLET
***************************************************************/
const reInjectPortlet = class ReInjectPortlet extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="re-inject-portlet" data-fake-id={this.props["fake-id"]} data-portlet-id={this.props["portlet-id"]}>
        {(this.props["portlet-id"]) ? <p className="alert alert-warning">couldn't inject existing portlet (no portlet found)</p> : <p className="alert alert-warning">couldn't inject existing portlet (no ID provided)</p>}
      </div>
    );
  }
}
reInjectPortlet.defaultProps = {
  "fake-id"       : "true"
};

module.exports = {
  "portlet": portlet,
  "lfr-layout-container": lfrLayoutContainer,
  "lfr-row": lfrRow,
  "lfr-column": lfrColumn,
  "re-inject-portlet": reInjectPortlet
};