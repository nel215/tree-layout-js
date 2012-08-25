class TreeBuilder
    constructor: ()->
        @offsetX = 20
        @offsetY = 20
        @sizeX = 30
        @sizeY = 40
        @radius = 10
        @node = {}
        @traverse = {}
        @traverse['PreOrder'] = (v,y=0)=>
            @xAxis[v] = @x
            @yAxis[v] = y
            @x += 1
            for [label,u] in @node[v].edge
                @traverse['PreOrder'] u,y+1
        @traverse['PostOrder'] = (v,y=0)=>
            for [label,u] in @node[v].edge
                @traverse['PostOrder'] u,y+1
            @xAxis[v] = @x
            @yAxis[v] = y
            @x += 1
        @traverse['InOrder'] = (v,y=0)=>
            l = @node[v].edge.length
            for i in [0...(parseInt l/2)]
                [label,u] = @node[v].edge[i]
                @traverse['InOrder'] u,y+1
            @xAxis[v] = @x
            @yAxis[v] = y
            @x += 1
            for i in [(parseInt l/2)...l]
                [label,u] = @node[v].edge[i]
                @traverse['InOrder'] u,y+1
                
    ###
    * オフセットを設定する
    ###
    setOffset: (@offsetX,@offsetY)=>
    
    ###
    * ノード間の幅を設定する
    ###
    setSize: (@sizeX,@sizeY)=>    
    
    ###
    * ノードの半径を設定する
    ###
    setRadius: (@radius)=>
    
    ###
    * ノードを作成する
    ###
    makeNode: (v,label='')=>
        @node[v] = {}
        @node[v].label = label
        @node[v].edge = []
    
    ###
    * ノード間を有向辺でつなぐ
    * @param {number} from：始点となるノード番号
    * @param {number} to：終点となるノード番号
    * @param {string} label：辺のラベル
    ###
    linkNode: (from,to,label='')=>
        if not @node[from]?
            @makeNode from
        if not @node[to]?
            @makeNode to
        @node[from].edge.push [label,to]
    
    
    ###
    * 木を配置する
    * @param {string} mode：配置モード
    *   'PreOrder'：行きがけ順で配置する
    *   'OutOrder'：帰りがけ順で配置する
    *   'InOrder':通りがけ順で配置する
    * @param {number} root：木の根のノード番号
    ###
    layout: (mode,root)=>
        @xAxis = {}
        @yAxis = {}
        @x = 0
        if @traverse[mode]?
            @traverse[mode] root
        else
            console.log mode+' mode not found.'
    
    ###
    * ラベルを描画する
    ###
    drawLabel: (label,x,y)=>
        if label is ''
            return
        l = label.length
        r = @paper.rect x-3*l-1,y-5,6*l+2,10
        r.attr 'fill','#FFF'
        t = @paper.text x,y-1,label
        t.attr 'fill','#000'   
    
    drawEdge: (v)=>
        for [label,u] in @node[v].edge
            fx = @xAxis[v]*@sizeX+@offsetX
            fy = @yAxis[v]*@sizeY+@offsetY
            tx = @xAxis[u]*@sizeX+@offsetX
            ty = @yAxis[u]*@sizeY+@offsetY
            param = 'M'+fx+','+fy+'L'+tx+','+ty
            p = @paper.path param
            @drawLabel label,(fx+tx)/2,(fy+ty)/2
            @drawEdge u
            
    drawNode: (v)=>
        x = @xAxis[v]*@sizeX+@offsetX
        y = @yAxis[v]*@sizeY+@offsetY
        c = @paper.circle x,y,@radius
        c.attr 'fill','#F00'
        @drawLabel @node[v].label,x,y
        for [label,u] in @node[v].edge
            @drawNode u
           
    ###
     * 木を描画する
     * @param {string} id：木を描画するコンテナID
     * @param {number} root：木の根のノード番号
     * @param {number} width：描画領域の幅
     * @param {number} height：描画領域の高さ
    ###
    draw: (id,root,width=640,height=480)=>
        obj = document.getElementById id
        while obj.childNodes.length>0
            obj.removeChild obj.firstChild
        @paper = (Raphael id,width,height)
        @drawEdge(root)
        @drawNode(root)
    
        
        
        
        
        
