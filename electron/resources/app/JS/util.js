function toHex(i, pad) {

    if (typeof(pad) === 'undefined' || pad === null) {
      pad = 2;
    } 

    var strToParse = i.toString(16).toUpperCase();
  
    while (strToParse.length < pad) {
      strToParse = "0" + strToParse;
    }
    return strToParse;
};

function strlen(str){
  var stringByteLength = (function(s,b,i,c){
    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
    return b
  })(str);
  return stringByteLength;
}

function trim(str){
  var len = this.strlen(str);
  return str.substring(0, len);
}

export {
    toHex,
    strlen,
    trim
};
