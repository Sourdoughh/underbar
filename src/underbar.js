(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    // return n === undefined ? array[0] : array.slice(0, n);
    if(n === undefined ){ //Checks if n is undefined
      return array[0]; //if n is undefined then return just the first element of the array
    } else {
      return array.slice(0, n); //slice will produce a new array from the 0th element to the nth
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var arrLength = array.length;

    if(n > arrLength){ //if n is larger than the array then we'll return the whole array
      return array;
    }

    if (n === undefined) { // checks if n is undefined
      return array[arrLength - 1]; //return the array's last element.
    } else {
      return array.slice(arrLength - n, arrLength); //slices the distance of n to the last element
    }

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){ //if collection is an array
      for(var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection); //will apply iterator on collection[i] (element), i (index), collection
      }
    } else { //if the collection is not an array it's an object
      for(var key in collection){
        iterator(collection[key], key, collection); //will apply iterator on collection[key] (value), key (key), collection
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1; //set result to -1 if the target isn't in the array then return -1

    _.each(array, function(item, index) { //here the function(item, index) item can be also called element since this is an array
      if (item === target && result === -1) { //item matches with the target, and if we haven't found another match
        result = index; //set the result to the index, here we actaully loop through the whole array and don't stop until the end
      } //because of that fact the if statement has to include the check to see if the result has been changed
    });

    return result;

    // var result = -1;

    // for(var i = 0; i < array.length; i++){
    //   if(array[i] === target && result === -1){
    //      return i; //if found then exit the loop and return the index
    //   }
    // };

    // return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var answer = []; //answer will be a array of things

    _.each(collection, function(element){ //calling each on the collection and using the iterator to look at each element
      if(test(element)){ //if the element passes the truth test's function then push that answer to the answer array
        answer.push(element);
      }
    });

    // for(var i = 0; i < collection.length; i++){
    //   if(test(collection[i])){
    //     answer.push(collection[i]);
    //   }
    // }

    return answer;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    var passedTest = _.filter(collection, test); //returns an array of elements that passed the test
    var answer = [];

    _.each(collection, function(element, index, list){
      if(_.indexOf(passedTest, element) === -1){ //here we loop through and look to see if the element in our collection is not there if it isn't then it didn't pass the test
        answer.push(element); //that element gets pushed to the answer array
      }
    });

    return answer;

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var dupFreeArr = [];

    _.each(array, function(element, index, list){
      if(_.indexOf(dupFreeArr, element) === -1){ //in this case if the element isnt in our dupFreeArr then we push that element
        dupFreeArr.push(element);
      }
    })

    // for(var i = 0; i < array.length; i++){
    //   if(dupFreeArr.indexOf(array[i]) === -1){
    //     dupFreeArr.push(array[i]);
    //   }
    // }

    return dupFreeArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var answer = [];

    if(Array.isArray(collection)){ //a lot like each, but in this case we're pushing element/value, index/key, collection to an array that we can return
      for(var i = 0; i < collection.length; i++){
        answer.push(iterator(collection[i], i, collection));
      }
    } else {
      for(var key in collection){
        answer.push(iterator(collection[key], key, collection));
      }
    };

    return answer;

    // var answer = [];

    // _.each(collection, function(element, index, list){
    //   answer.push(iterator(element, index, list));
    // })

    // return answer;

    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){ //_.map evaluates to an array of item[key] pairs.
      return item[key]; //you could also store _.map in a variable and return it. It's basically the same thing.
    });

    // var answer = [];
    // _.each(collection, function(item){
    //   answer.push(item[key]);
    // });
    // return answer;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    _.each(collection, function(element){ //use each to loop through each element,
      if(accumulator === undefined){ //the if statement just checks if the accumulator was defined or not
        accumulator = element; //set the accumulator to the element
      } else {
        accumulator = iterator(accumulator, element); //apply the iterator to the accumulator and element if we were using the sum function
      } //it would be function(total, number){}return total + number. The right side evaluates to a number and the accumulator gets set to that number
    }); //it keeps iterating through the collection until it's done.
    return accumulator;

    // for(var i = 0; i < collection.length; i++){
    //   if(accumulator === undefined){
    //     accumulator = collection[0];
    //   } else {
    //     accumulator = iterator(accumulator, collection[i]);
    //   }
    // }2

    // return accumulator;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) { //the function in reduce looks at the item and target and evaluates it to a bool
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);

    // var answer = false;

    // for(var i = 0; i < collection.length; i++){
    //   if(collection[i]===target){
    //     answer = true
    //   }
    // };

    // return answer;

    //It appears that wasFound is the accumulator, the intial value set to false,
    //and the item is each element/value in the collection. It'll iterate through
    //each element/value and compare it vs target. If the return is true then the
    //accumulator returns true and the statement exits?
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
      return _.reduce(collection, function(accumulator, element){
        if(!accumulator){ //accumulator is initially set to false if it's true the inverse evaluates to false, and the statement wont return
          return false; //if the logic sets accumulator to false then it'll evaluate to true, and return the false statement.
        }

        // if(iterator === undefined){
        //   return _.identity(element) ? true : false;
        // } else {
        //   return iterator(element) ? true : false;
        // }

        if(iterator === undefined){ //this first part checks if the iterator has been defined, if not then use _.identity and call it on an element
          if(_.identity(element)){ //should evaluate to a truthy or falsy value
            return true;
          } else {
            return false;
          }
        } else {
          if(iterator(element)){ //iterator is what your test will be.
            return true;
          } else {
            return false;
          }
        }

      }, true);//collection, func, acc to true
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    if(iterator === undefined) { //if iterator is not defined default to _.identity
      iterator = _.identity;
    }

    return !_.every(collection, function(element){
      return !iterator(element); //so the iterator(element) while it may evaluate true, it'll keep going if it's false
    });

    // var answer = false
    // for(var i = 0; i < collection.length; i++){
    //   if(iterator(collection[i])){
    //     answer = true;
    //   }
    // }
    // return answer;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  // value key collection
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(elementObj){ //the arguments keyword access all the arguments being passed in and returns an array we loop through each element
      _.each(elementObj, function(innerValue, key){ //each value in the element object is looked at and the key is passed to the new object
        obj[key] = innerValue;
      });
    });
    return obj;

    // for(var i = 0; i < arguments.length; i++){
    //   for(var key in arguments[i]){
    //     obj[key] = arguments[i][key]
    //   }
    // }
    // return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // _.each(arguments, function(elementObj){
    //   _.each(elementObj, function(innerValue, key){
    //     if(!obj.hasOwnProperty(key)) //the same thing as extend except there's an if statment to check if the key exists or not in our object
    //       obj[key] = innerValue
    //   });
    // });
    // return obj;

    for(var i = 0; i < arguments.length; i++){
      for(var key in arguments[i]){
        if(!obj.hasOwnProperty(key)){
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    // return function() {
    //   if (!alreadyCalled) {
    //     // TIP: .apply(this, arguments) is the standard way to pass on all of the
    //     // infromation from one function call to another.
    //     result = func.apply(this, argument`s);
    //     alreadyCalled = true;
    //   }
    //   // The new function always returns the originally computed result.
    //   return result;
    // };

    // return function(){
    //   if(alreadyCalled === true){
    //     return result;
    //   } else {
    //     alreadyCalled = true
    //     result = func();
    //     return result
    //   }
    // }

    return function(){
      if(!alreadyCalled){
        alreadyCalled = true;
        result = func.apply(this, arguments);
        return result;
      } else {
        return result;
      }
    }

  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  var times2 = function(n){
    return n*2;
  }

  // var times2Memo = _.memoize(times2);
  //                = var memo = {}; //you don't see this returned but it's contained in the closure scope
  //                  function(){ //this function is all that you see when it gets returned
  //                    var argu = Array.prototype.slice.call(arguments); //access the arguments in the function basically what you pass to times2Memo
  //                    if(!(argu in memo)){ //if the thing you passed through times2Memo is there then don't continue if it isn't then continue
  //                     memo[argu] = func.apply(this, arguments); //func.apply(this, arguments) takes the arguments and passes it through the function we passed
  //                    }
  //                    return memo[argu];
  //                  }
  // times2Memo(2);
  // 4

  _.memoize = function(func) {
    var memo = {}; //store function resuts here
    return function(){
      var argu = Array.prototype.slice.call(arguments); //for each argument in the function
      if(!(argu in memo)){ //check if it doesn't exist
        memo[argu] = func.apply(this, arguments); //if it's not saved then run the function
      }
      return memo[argu];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var argu = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){
      func.apply(this, argu);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copiedArray = array.slice();
    var newArr = [];
    var n = copiedArray.length;
    var randomInt;

    while(n){
      randomInt = Math.floor(Math.random()*n);
      newArr.push(copiedArray.splice(randomInt, 1)[0]);
      n--;
    }

    return newArr;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
