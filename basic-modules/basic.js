"use strict";

const getType = function(object){
  var toString = Object.prototype.toString;
  return toString.call(object).split(" ")[1].slice(0, -1).toLowerCase();
}

const isSameObject = function(object1, object2, ignoreArrayOrder=false){
  if(getType(object1) == getType(object2)){
    switch (getType(object1)) {
      case "object":
        const keys = Object.keys(object1).toSorted();
        if(isSameObject(keys, Object.keys(object2).toSorted())){
          for(const key of keys){
            if(!isSameObject(object1[key], object2[key])){
              return false
            }
          }
          return true;
        } else{
          return false;
        }
        break;
      case "array":
        const length = object1.length;
        if(length == object2.length){
          if(ignoreArrayOrder){
            for(let i=0; i<length; i++){
              let isIncluded = false;
              for(let j=0; j<length; j++){
                if(isSameObject(object1[i], object2[j])){
                  isIncluded = true;
                  break;
                }
              }
              if(!isIncluded){
                return false;
              }
            }
          } else {
            for(let i=0; i<length; i++){
              if(!isSameObject(object1[i], object2[i])){
                return false
              }
            }
          }
          return true;
        } else{
          return false;
        }
        break;
      default:
        return object1 == object2;
    }
    return;
  }
  return false;
}

module.exports = { getType, isSameObject };