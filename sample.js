window.onload = function(){
    var tb = new TreeBuilder();
    tb.makeNode(0,'root');
    tb.linkNode(0,1,'a');
    tb.linkNode(0,2,'a');
    tb.linkNode(0,3,'b');
    tb.linkNode(0,7,'b');
    tb.linkNode(1,5,'c');
    tb.linkNode(2,6,'a');
    tb.layout('PreOrder',0);
    tb.draw('sample1',0);
    tb.layout('PostOrder',0);
    tb.setSize(50,50);
    tb.draw('sample2',0);
    tb.setOffset(50,50);
    tb.layout('InOrder',0);
    tb.draw('sample3',0);
};