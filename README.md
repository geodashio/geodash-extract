# GeoDash Extract (geodash-extract)

The `extract` function for [GeoDash](http://geodash.io) that is used during building and runtime.

```
var value = extract(keyChain, node, fallback)
```

## GeoDash

GeoDash is a modern web framework and approach for quickly producing visualizations of geospatial data. The name comes from "geospatial dashboard".

The framework is built to be extremely extensible. You can use GeoDash Server (an implementation), the front-end framework, backend code, or just the Gulp pipeline. Have fun!

See [http://geodash.io](http://geodash.io) for more details.

# Install

Install with [npm](https://npmjs.org/package/geodash-extract)

```
npm install geodash-extract--save-dev
```

# Usage

`extract` is a powerful function that provides the basis for much of the GeoDash methodology.  Rather than having many `getter` methods for different objects that require a developer to "memorize" classes.  `extract` can dive into a dashboard configuration and retrieve any value at an arbitrary depth.  This provides an immense about of flexibility.  For example, from the `geodash.init.state(options)` function:

```
var newView = {
  "baselayer": (extract("view.baselayer", newState) || extract(["dashboard", "baselayers", 0, "id"], options)),
  "featurelayers": (extract("view.featurelayers", newState) || $.map(extract(["dashboard", "featurelayers"], options, []), function(fl){ return fl.id; })),
  "controls": extract("view.controls", newState) || ["legend"]
};
```

Extract supports a `key chain` specified as either a list of keys separated by periods or an array.  This provides an interface for Angular to interrogate the dashboard config in a variety of contexts with minimal new code in either the template or controller.

Since the function is used throughout the framework and in downstream project code, in GeoDashJS, it is attached to the `window` and is globally accessible with no namespace.

# Building

## docs

To build the custom docs template used in the website, you'll need to install a custom version of docstrap.git on top of the default version.  The below command will install the custom version.

```
npm install git+https://git@github.com/geodashio/docstrap.git\#geodash # Install custom docs template with font awesome
```

You can just build docs with:
```
npm run build:docs # or gulp docs since run the same thing
```

# Tests

Only [jshint](http://jshint.com/about/) is supported right now.  Run tests with the following command.

```
npm run tests
```

# Contributing

Happy to accept pull requests!

# License

See `LICENSE` file.
