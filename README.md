#upcloo-js-sdk

UpCloo JavaScript library

## Developers

First of all you have to install a list of dependencies

```
$ npm install expresso uglifyjs jshint recess -g
```

After that you can compile the library

```
$ make
```

The make process dependes on library sourcecode. JSHint check the 
library before compile the source and minimize the code.

### Clean the library

To clear the library compile use

```
$ make clean
```

Or to force the clean operation

```
$ make force-clean
```