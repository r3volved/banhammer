# Custom modules

Modules can be exported or self envoking


## Exporting a module

```js
//example.js
module.exports = function ( date = new Date() ) {
  console.log(`Timestamp`, date.getTime())
}
```


## Exporting a self envoking function

```js
//example.js
//Self envoking function
(function print_date() {
  let date = new Date();
  console.log(`Timestamp`, date.getTime())
})();
```


## Exporting a self envoking script

```js
//example.js
let date = new Date();
console.log(`Timestamp`, date.getTime())
```
