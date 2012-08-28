// 使い方

window.onload = function(){
    var tb = new TreeBuilder();
    // ノードの作成
    tb.makeNode(0,'root');
    tb.makeNode(1);
    // 作成した後からラベルの設定
    tb.setNodeLabel(1,'first');
    // ラベル付きエッジ
    tb.linkNode(0,1,'a');
    tb.linkNode(0,2,'a');
    tb.linkNode(0,3,'b');
    // ラベルなしエッジ
    tb.linkNode(0,7);
    tb.linkNode(1,5);
    tb.linkNode(2,6);
    // レイアウト方式の設定+ルートの設定
    tb.layout('PreOrder',0);
    // 描画するdiv要素のid設定+ルートの設定
    tb.draw('sample1',0);
    tb.layout('PostOrder',0);
    tb.setSize(50,50);
    tb.draw('sample2',0);
    tb.setOffset(50,50);
    // ノードの色変更
    tb.setNodeColor("#0F0");
    tb.layout('InOrder',0);
    tb.draw('sample3',0);
};