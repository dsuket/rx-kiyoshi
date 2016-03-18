/*global Rx*/
(function() {
'use strict';

function createStream2() {
  var randomStream = Rx.Observable.create(observer => {
    observer.onNext(Math.floor(Math.random()*100)%2);
    observer.onCompleted();
  });
  var zun = Rx.Observable.of('ズン');
  var doko = Rx.Observable.of('ドコ');
  var zundoko = randomStream.flatMap(val => (val ? zun : doko));

  var stream = Rx.Observable.interval(500)
      .flatMap(zundoko)
      .do(val => console.log(val))
      .scan((acc, x) => {
        acc.push(x);
        if (acc.length > 5) {
          acc.shift();
        }
        return acc;
      },[])
      .do(val => console.log(val))
      .takeWhile((val) => {
        return val.join('') !== 'ズンズンズンズンドコ';
      });
  return stream;
}

function start1() {
  var source = createStream2();
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
