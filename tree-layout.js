// Generated by CoffeeScript 1.3.3
var TreeBuilder,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

TreeBuilder = (function() {

  function TreeBuilder() {
    this.draw = __bind(this.draw, this);

    this.drawNode = __bind(this.drawNode, this);

    this.drawEdge = __bind(this.drawEdge, this);

    this.drawLabel = __bind(this.drawLabel, this);

    this.layout = __bind(this.layout, this);

    this.linkNode = __bind(this.linkNode, this);

    this.makeNode = __bind(this.makeNode, this);

    this.setNodeColor = __bind(this.setNodeColor, this);

    this.setRadius = __bind(this.setRadius, this);

    this.setSize = __bind(this.setSize, this);

    this.setOffset = __bind(this.setOffset, this);

    this.setNodeLabel = __bind(this.setNodeLabel, this);

    var _this = this;
    this.offsetX = 20;
    this.offsetY = 20;
    this.sizeX = 30;
    this.sizeY = 40;
    this.radius = 10;
    this.nodeColor = '#F00';
    this.node = {};
    this.traverse = {};
    this.traverse['PreOrder'] = function(v, y) {
      var label, u, _i, _len, _ref, _ref1, _results;
      if (y == null) {
        y = 0;
      }
      _this.xAxis[v] = _this.x;
      _this.yAxis[v] = y;
      _this.x += 1;
      _ref = _this.node[v].edge;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], label = _ref1[0], u = _ref1[1];
        _results.push(_this.traverse['PreOrder'](u, y + 1));
      }
      return _results;
    };
    this.traverse['PostOrder'] = function(v, y) {
      var label, u, _i, _len, _ref, _ref1;
      if (y == null) {
        y = 0;
      }
      _ref = _this.node[v].edge;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], label = _ref1[0], u = _ref1[1];
        _this.traverse['PostOrder'](u, y + 1);
      }
      _this.xAxis[v] = _this.x;
      _this.yAxis[v] = y;
      return _this.x += 1;
    };
    this.traverse['InOrder'] = function(v, y) {
      var i, l, label, u, _i, _j, _ref, _ref1, _ref2, _ref3, _results;
      if (y == null) {
        y = 0;
      }
      l = _this.node[v].edge.length;
      for (i = _i = 0, _ref = parseInt(l / 2); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _ref1 = _this.node[v].edge[i], label = _ref1[0], u = _ref1[1];
        _this.traverse['InOrder'](u, y + 1);
      }
      _this.xAxis[v] = _this.x;
      _this.yAxis[v] = y;
      _this.x += 1;
      _results = [];
      for (i = _j = _ref2 = parseInt(l / 2); _ref2 <= l ? _j < l : _j > l; i = _ref2 <= l ? ++_j : --_j) {
        _ref3 = _this.node[v].edge[i], label = _ref3[0], u = _ref3[1];
        _results.push(_this.traverse['InOrder'](u, y + 1));
      }
      return _results;
    };
  }

  /*
      * ノードのラベルを設定する
  */


  TreeBuilder.prototype.setNodeLabel = function(v, label) {
    if (this.node[v] != null) {
      return this.node[v].label = label;
    }
  };

  /*
      * オフセットを設定する
  */


  TreeBuilder.prototype.setOffset = function(offsetX, offsetY) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  };

  /*
      * ノード間の幅を設定する
  */


  TreeBuilder.prototype.setSize = function(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  };

  /*
      * ノードの半径を設定する
  */


  TreeBuilder.prototype.setRadius = function(radius) {
    this.radius = radius;
  };

  /*
      * ノードの色を指定する
  */


  TreeBuilder.prototype.setNodeColor = function(nodeColor) {
    this.nodeColor = nodeColor;
  };

  /*
      * ノードを作成する
  */


  TreeBuilder.prototype.makeNode = function(v, label) {
    if (label == null) {
      label = '';
    }
    this.node[v] = {};
    this.node[v].label = label;
    return this.node[v].edge = [];
  };

  /*
      * ノード間を有向辺でつなぐ
      * @param {number} from：始点となるノード番号
      * @param {number} to：終点となるノード番号
      * @param {string} label：辺のラベル
  */


  TreeBuilder.prototype.linkNode = function(from, to, label) {
    if (label == null) {
      label = '';
    }
    if (!(this.node[from] != null)) {
      this.makeNode(from);
    }
    if (!(this.node[to] != null)) {
      this.makeNode(to);
    }
    return this.node[from].edge.push([label, to]);
  };

  /*
      * 木を配置する
      * @param {string} mode：配置モード
      *   'PreOrder'：行きがけ順で配置する
      *   'OutOrder'：帰りがけ順で配置する
      *   'InOrder':通りがけ順で配置する
      * @param {number} root：木の根のノード番号
  */


  TreeBuilder.prototype.layout = function(mode, root) {
    this.xAxis = {};
    this.yAxis = {};
    this.x = 0;
    if (this.traverse[mode] != null) {
      return this.traverse[mode](root);
    } else {
      return console.log(mode + ' mode not found.');
    }
  };

  /*
      * ラベルを描画する
  */


  TreeBuilder.prototype.drawLabel = function(label, x, y) {
    var l, r, t;
    if (label === '') {
      return;
    }
    l = label.length;
    r = this.paper.rect(x - 3 * l - 1, y - 5, 6 * l + 2, 10);
    r.attr('fill', '#FFF');
    t = this.paper.text(x, y - 1, label);
    return t.attr('fill', '#000');
  };

  /*
      * エッジを描画する
  */


  TreeBuilder.prototype.drawEdge = function(v) {
    var fx, fy, label, p, param, tx, ty, u, _i, _len, _ref, _ref1, _results;
    _ref = this.node[v].edge;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref1 = _ref[_i], label = _ref1[0], u = _ref1[1];
      fx = this.xAxis[v] * this.sizeX + this.offsetX;
      fy = this.yAxis[v] * this.sizeY + this.offsetY;
      tx = this.xAxis[u] * this.sizeX + this.offsetX;
      ty = this.yAxis[u] * this.sizeY + this.offsetY;
      param = 'M' + fx + ',' + fy + 'L' + tx + ',' + ty;
      p = this.paper.path(param);
      this.drawLabel(label, (fx + tx) / 2, (fy + ty) / 2);
      _results.push(this.drawEdge(u));
    }
    return _results;
  };

  /*
      * ノードを描画する
  */


  TreeBuilder.prototype.drawNode = function(v) {
    var c, label, u, x, y, _i, _len, _ref, _ref1, _results;
    x = this.xAxis[v] * this.sizeX + this.offsetX;
    y = this.yAxis[v] * this.sizeY + this.offsetY;
    c = this.paper.circle(x, y, this.radius);
    c.attr('fill', this.nodeColor);
    this.drawLabel(this.node[v].label, x, y);
    _ref = this.node[v].edge;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref1 = _ref[_i], label = _ref1[0], u = _ref1[1];
      _results.push(this.drawNode(u));
    }
    return _results;
  };

  /*
       * 木を描画する
       * @param {string} id：木を描画するコンテナID
       * @param {number} root：木の根のノード番号
       * @param {number} width：描画領域の幅
       * @param {number} height：描画領域の高さ
  */


  TreeBuilder.prototype.draw = function(id, root, width, height) {
    var obj;
    if (width == null) {
      width = 640;
    }
    if (height == null) {
      height = 480;
    }
    obj = document.getElementById(id);
    while (obj.childNodes.length > 0) {
      obj.removeChild(obj.firstChild);
    }
    this.paper = Raphael(id, width, height);
    this.drawEdge(root);
    return this.drawNode(root);
  };

  return TreeBuilder;

})();
