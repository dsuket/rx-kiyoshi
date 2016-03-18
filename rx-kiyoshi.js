/*global Rx*/
(function() {
'use strict';

function createZundokoStream() {
  var randomStream = Rx.Observable.create(observer => {
    observer.onNext(Math.floor(Math.random()*100)%2);
    observer.onCompleted();
  });
  var zun = Rx.Observable.of('ズン');
  var doko = Rx.Observable.of('ドコ');
  var zundoko = randomStream.flatMap(val => (val ? zun : doko));
  return zundoko;
}

function createStream() {
  var zundoko = createZundokoStream();

  var stream = Rx.Observable.interval(500)
      .flatMap(zundoko)
      .do(val => console.log(val))
      .bufferWithCount(5, 1)
      .do(val => console.log(val))
      .takeWhile((val) => {
        return val.join('') !== 'ズンズンズンズンドコ';
      });
  return stream;
}

function start1() {
  var source = createStream();
  var subscription = source.subscribe(
      function(x) {
          // console.log('Next: ', x);
      },
      function(err) {
          console.log('Error: ', err);
      },
      function() {
          console.log('キ・ヨ・シ！');
      }
  );
}

function start2() {
  // see: http://qiita.com/kikurage/items/8535e757a0cb133571d7
  let n;
  for(n=3;n-2;console.log(n-2?(n|=2*Math.random())&1?'ドコ':'ズン':'キ・ヨ・シ!'))n=2*n&62
}

start1();

})();
