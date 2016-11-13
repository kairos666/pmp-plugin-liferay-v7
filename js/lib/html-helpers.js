'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*** helpers ***/
var testWrongDirectChild = function testWrongDirectChild(childType, children) {
  var result = false;
  _react2.default.Children.map(children, function (child) {
    //check if layout container are only childType [class name]
    if (child.type && child.type.name !== childType) result = true;
  });

  return result;
};
var testWrongColumnDirectChild = function testWrongColumnDirectChild(children) {
  var result = false;
  _react2.default.Children.map(children, function (child) {
    //check if layout container are only childType [class name]
    if (child.type && child.type.name !== 'Portlet' && child.type.name !== 'ReInjectPortlet') result = true;
  });

  return result;
};
var hasDirectChildType = function hasDirectChildType(childType, children) {
  var result = false;
  _react2.default.Children.map(children, function (child) {
    //check if layout container are only childType [class name]
    if (child.type && child.type.name === childType) result = true;
  });

  return result;
};
var directChildCount = function directChildCount(childType, children) {
  var result = 0;
  _react2.default.Children.map(children, function (child) {
    if (child.type && child.type.name === childType) result++;
  });

  return result;
};
var columnRelativePrefixFinder = function columnRelativePrefixFinder(columnIndex, columnTotalInRow) {
  //only
  if (columnTotalInRow == 1) return 'only';
  //first
  if (columnTotalInRow >= 2 && columnIndex == 1) return 'first';
  //last
  if (columnTotalInRow >= 2 && columnIndex == columnTotalInRow) return 'last';
  //otherwise
  return '';
};
/***************************************************************
      LFR LAYOUT CONTAINER
***************************************************************/
var lfrLayoutContainer = function (_React$Component) {
  _inherits(LfrLayoutContainer, _React$Component);

  function LfrLayoutContainer(props) {
    _classCallCheck(this, LfrLayoutContainer);

    return _possibleConstructorReturn(this, (LfrLayoutContainer.__proto__ || Object.getPrototypeOf(LfrLayoutContainer)).call(this, props));
  }

  _createClass(LfrLayoutContainer, [{
    key: 'render',
    value: function render() {
      var wrongChild = testWrongDirectChild('LfrRow', this.props.children);
      var columnCount = 1;
      var rowChildrenUpdatedProps = [];

      //column index setting
      _react2.default.Children.map(this.props.children, function (child) {
        if (child.type && child.type.name === 'LfrRow' && child.props && child.props.children) {
          var columnChildrenUpdatedProps = [];
          var columnLocalTotal = directChildCount('LfrColumn', child.props.children);
          var columnLocalCount = 1;
          _react2.default.Children.map(child.props.children, function (subChild) {
            //check only lfr-columns
            if (subChild.type && subChild.type.name === 'LfrColumn') {
              //inside layout column
              var newProps = {
                columnIndex: columnCount,
                columnRelativeSetting: columnRelativePrefixFinder(columnLocalCount, columnLocalTotal)
              };
              columnChildrenUpdatedProps.push(_react2.default.cloneElement(subChild, newProps));
              columnCount++;
              columnLocalCount++;
            } else {
              columnChildrenUpdatedProps.push(subChild);
            }
          });
          rowChildrenUpdatedProps.push(_react2.default.cloneElement(child, { updatedChildren: columnChildrenUpdatedProps }));
        } else {
          rowChildrenUpdatedProps.push(child);
        }
      });

      return _react2.default.createElement(
        'div',
        { className: this.props['add-classes'], id: 'main-content', role: 'main' },
        wrongChild ? _react2.default.createElement(
          'p',
          { className: 'alert alert-warning' },
          'lfr-layout-container accepts only lfr-row for direct child'
        ) : null,
        rowChildrenUpdatedProps
      );
    }
  }]);

  return LfrLayoutContainer;
}(_react2.default.Component);

/***************************************************************
      LFR ROW
***************************************************************/
var lfrRow = function (_React$Component2) {
  _inherits(LfrRow, _React$Component2);

  function LfrRow(props) {
    _classCallCheck(this, LfrRow);

    return _possibleConstructorReturn(this, (LfrRow.__proto__ || Object.getPrototypeOf(LfrRow)).call(this, props));
  }

  _createClass(LfrRow, [{
    key: 'render',
    value: function render() {
      var wrongChild = testWrongDirectChild('LfrColumn', this.props.children);

      return _react2.default.createElement(
        'div',
        { className: 'portlet-layout row' },
        wrongChild ? _react2.default.createElement(
          'p',
          { className: 'alert alert-warning' },
          'lfr-row accepts only lfr-columns for direct child'
        ) : null,
        this.props.updatedChildren
      );
    }
  }]);

  return LfrRow;
}(_react2.default.Component);

/***************************************************************
      LFR COLUMN
***************************************************************/
var lfrColumn = function (_React$Component3) {
  _inherits(LfrColumn, _React$Component3);

  function LfrColumn(props) {
    _classCallCheck(this, LfrColumn);

    return _possibleConstructorReturn(this, (LfrColumn.__proto__ || Object.getPrototypeOf(LfrColumn)).call(this, props));
  }

  _createClass(LfrColumn, [{
    key: 'render',
    value: function render() {
      var wrongChild = testWrongColumnDirectChild(this.props.children);
      var emptyColumn = hasDirectChildType('Portlet', this.props.children) || hasDirectChildType('ReInjectPortlet', this.props.children) ? '' : ' empty';
      var dynamicClasses = this.props.columnRelativeSetting !== '' ? 'portlet-column-' + this.props.columnRelativeSetting : '';
      var dynamicInnerClasses = this.props.columnRelativeSetting !== '' ? 'portlet-column-content-' + this.props.columnRelativeSetting : '';
      var classes = this.props['add-classes'] + ' portlet-column ' + dynamicClasses + ' yui3-dd-drop';
      var innerClasses = 'portlet-dropzone portlet-column-content ' + dynamicInnerClasses + emptyColumn;
      return _react2.default.createElement(
        'div',
        { className: classes, id: "column-" + this.props.columnIndex },
        _react2.default.createElement(
          'div',
          { className: innerClasses, id: "layout-column_column-" + this.props.columnIndex },
          wrongChild ? _react2.default.createElement(
            'p',
            { className: 'alert alert-warning' },
            'lfr-column accepts only portlet for direct child'
          ) : null,
          this.props.children
        )
      );
    }
  }]);

  return LfrColumn;
}(_react2.default.Component);

/***************************************************************
      PORTLET
***************************************************************/
var portlet = function (_React$Component4) {
  _inherits(Portlet, _React$Component4);

  function Portlet(props) {
    _classCallCheck(this, Portlet);

    return _possibleConstructorReturn(this, (Portlet.__proto__ || Object.getPrototypeOf(Portlet)).call(this, props));
  }

  _createClass(Portlet, [{
    key: 'render',
    value: function render() {
      var portletType = this.props['portlet-type'] ? " portlet-" + this.props['portlet-type'] : '';
      return _react2.default.createElement(
        'div',
        _extends({ className: "portlet-boundary portlet-" + this.props['application-decorators'] + portletType + " yui3-dd-drop portlet-draggable" }, this.props),
        _react2.default.createElement(
          'section',
          { className: 'portlet' },
          _react2.default.createElement(
            'header',
            { className: 'portlet-topper' },
            _react2.default.createElement(
              'div',
              { className: 'portlet-title-default' },
              _react2.default.createElement(
                'span',
                { className: 'portlet-name-text' },
                'fake portlet'
              )
            ),
            _react2.default.createElement('menu', { className: 'portlet-topper-toolbar', type: 'toolbar' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'portlet-content' },
            _react2.default.createElement(
              'h2',
              { className: 'portlet-title-text portlet-title-editable' },
              this.props['content-title']
            ),
            _react2.default.createElement(
              'div',
              { className: ' portlet-content-container' },
              _react2.default.createElement(
                'div',
                { className: 'portlet-body' },
                this.props.children
              )
            )
          )
        )
      );
    }
  }]);

  return Portlet;
}(_react2.default.Component);
portlet.defaultProps = {
  "content-title": 'fake title',
  "application-decorators": 'decorate'
};

/***************************************************************
      RE INJECT LFR PORTLET
***************************************************************/
var reInjectPortlet = function (_React$Component5) {
  _inherits(ReInjectPortlet, _React$Component5);

  function ReInjectPortlet(props) {
    _classCallCheck(this, ReInjectPortlet);

    return _possibleConstructorReturn(this, (ReInjectPortlet.__proto__ || Object.getPrototypeOf(ReInjectPortlet)).call(this, props));
  }

  _createClass(ReInjectPortlet, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 're-inject-portlet', 'data-fake-id': this.props["fake-id"], 'data-portlet-id': this.props["portlet-id"] },
        this.props["portlet-id"] ? _react2.default.createElement(
          'p',
          { className: 'alert alert-warning' },
          'couldn\'t inject existing portlet (no portlet found)'
        ) : _react2.default.createElement(
          'p',
          { className: 'alert alert-warning' },
          'couldn\'t inject existing portlet (no ID provided)'
        )
      );
    }
  }]);

  return ReInjectPortlet;
}(_react2.default.Component);
reInjectPortlet.defaultProps = {
  "fake-id": "true"
};

module.exports = {
  "portlet": portlet,
  "lfr-layout-container": lfrLayoutContainer,
  "lfr-row": lfrRow,
  "lfr-column": lfrColumn,
  "re-inject-portlet": reInjectPortlet
};