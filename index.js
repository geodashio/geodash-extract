/**
 * A powerful function that provides the basis for much of the
 * GeoDash methodology.  Rather than having many `getter` methods for different
 * objects that require a developer to "memorize" classes.  `extract` can dive
 * into a dashboard configuration and retrieve any value at an arbitrary depth.
 * This provides an immense about of flexibility.
 *
 * @function extract
 * @param {(string|string[]|int[]|Object[])} keyChain - The arbitrary key chain that cna be a string or array of primitives.
 * @param {(Object)} node - The Javascript object to interrogate
 * @param {(Object)} fallback - The value returned if the object specified at the location described by the key chain does not exist.
 * @return the value at the location described by the key chain or the fallback value
 *
 * @example <caption>Basic</caption>
 * var newView = {
 * "baselayer": (extract("view.baselayer", newState) || extract(["dashboard", "baselayers", 0, "id"], options)),
 * "featurelayers": (extract("view.featurelayers", newState) || $.map(extract(["dashboard", "featurelayers"], options, []), function(fl){ return fl.id; })),
 *  "controls": extract("view.controls", newState) || ["legend"]
 * };
 *
 */

var extract = function(keyChain, node, fallback)
{
  if(typeof keyChain == "string")
  {
    keyChain = keyChain.split(".");
  }

  var obj = undefined;

  if(node != undefined && node != null)
  {
    if(keyChain.length==0)
    {
      obj = node;
    }
    else
    {
      var newKeyChain = keyChain.slice(1);
      if(newKeyChain.length == 0)
      {
        if((typeof keyChain[0] == "string") && keyChain[0].toLowerCase() == "length")
        {
          if(Array.isArray(node))
          {
            obj = node.length;
          }
          else if(node != undefined)
          {
            obj = node["length"];
          }
          else
          {
            obj = 0;
          }
        }
      }

      if(obj == undefined && node != undefined)
      {
        if(Array.isArray(node))
        {
          var index = (typeof keyChain[0] == "string") ?
            parseInt(keyChain[0], 10) :
            keyChain[0];
          obj = extract(newKeyChain, node[index], fallback);
        }
        else
        {
          obj = extract(newKeyChain, node[""+keyChain[0]], fallback);
        }
      }
  	}
  }
  else
  {
    obj = fallback;
  }
	return obj;
};

module.exports = extract;
