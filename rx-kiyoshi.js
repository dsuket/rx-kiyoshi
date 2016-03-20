/*global Rx*/
(function() {
'use strict';

var logObserver = {
  onNext: x => console.log('onNext:', x),
  onError: err => console.log('onError: ', err),
  onCompleted: () => console.log('onCompleted'),
};

function _createZundokoStream() {
  var randomStream = Rx.Observable.create(observer => {
    observer.onNext(!Math.floor(Math.random()*2));
    observer.onCompleted();
  });
  var zun = Rx.Observable.of('ズン');
  var doko = Rx.Observable.of('ドコ');
  var zundoko = randomStream.flatMap(val => (val ? zun : doko));
  return zundoko;
}

function createZundokoStream() {
  var zun = Rx.Observable.of('ズン');
  var doko = Rx.Observable.of('ドコ');
  var getRmd = () => Math.floor(Math.random()*100)%2;
  return Rx.Observable.if(getRmd, zun, doko);
}

function createStream() {
  var zundoko = createZundokoStream();
  var stream = Rx.Observable.interval(200)
      .flatMap(zundoko)
      .do(val => console.log(val))
      .bufferWithCount(5, 1)
      .do(val => console.log(val))
      .takeWhile(val => val.join('') !== 'ズンズンズンズンドコ');
  return stream;
}

function start1() {
  var source = createStream();
  source.subscribe({
      onNext: () =>  {},
      onError: err => console.log('Error: ', err),
      onCompleted: () => console.log('キ・ヨ・シ！'),
  });
}

function start2() {
  // see: http://qiita.com/kikurage/items/8535e757a0cb133571d7
  let n;
  for(n=3;n-2;console.log(n-2?(n|=2*Math.random())&1?'ドコ':'ズン':'キ・ヨ・シ!'))n=2*n&62
}

start1();

})();
