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

export {
    toHex
};
