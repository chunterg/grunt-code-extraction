# grunt-code-extraction

> Extract specified codes from html comment.

##What can this plugin do

####The orginal file a.html
```html
<div>
  <!--start:block1-->
  <div>
    block code
  </div>
  <!--end:block1-->
</div>
```

####The new file a.html
```html
<div>
#parse("block1")
</div>
```

####And new files which extract from a.html

block-a-block1.html

```html
<!--start:block1-->
<div>
  block code
</div>
<!--end:block1-->
```

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-code-extraction --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-code-extraction');
```

## The "code-extraction" task


### Options

#### options.prefix_start
Type: `String`

Default value: `start:`,means `<!--start:name-->` in html code


#### options.prefix_end
Type: `String`

Default value: `start:`,means `<!--end:name-->` in html code

#### options.code_replace
Type: `String`

Default value: `#parse:`,means #parse("") in html code`

#### options.encoding
Type: `String`

Default value: `gbk`


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  codeExtraction: {
    development: {
        options: {
          prefix_start:"start:",
          prefix_end:"end:",
          code_replace:"#include"
          encoding:'gbk'
        },
        files: {
          'tmp/': 'test/fixtures/**/*.html'
        },
      }
  },
})
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
