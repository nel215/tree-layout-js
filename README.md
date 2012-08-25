使い方
===================

    window.onload = function(){
        var tb = new TreeBuilder();
        // ラベル付きノードを作成したい場合は明示的にノードを作る
        tb.makeNode(0,'root');
        // ラベル付きエッジの作成
        tb.linkNode(0,1,'a');
        tb.linkNode(0,2,'a');
        tb.linkNode(0,3,'b');
        // ラベルなしエッジの作成
        tb.linkNode(0,7);
        tb.linkNode(1,5);
        tb.linkNode(2,6);
        // レイアウト方式をPreOrder,OutOrder,InOrderから選択する
        // ルートノード番号を渡す
        tb.layout('InOrder',0);
        // 描画するdiv要素のidを指定する
        // ルートノード番号を渡す
        tb.draw('sample1',0);
    };