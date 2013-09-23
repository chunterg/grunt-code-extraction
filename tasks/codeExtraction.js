/*
 * grunt-code-extraction
 * https://github.com/chunterg/grunt-code-extraction
 *
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('codeExtraction', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      prefix_start: 'start:',
      prefix_end: 'end:',
      encoding:'utf8'
    });
    var regObj = {};
    regObj.wholeFileName = /[^\/]*[\/]+/g;
    regObj.fileName = /(.*\/){0,}([^.]+).*/ig;
    regObj.fileSuffix = /[^\/]*[\/]+/g;
    regObj.blockCode = "/<!--" + options.prefix_start + "(\\w+)-->([\\s\\S]*)<!--\\" + options.prefix_end + "\\1-->/g";
    regObj.blockList = "/<!--" + options.prefix_start + "(\\w+)-->([\\s\\S]*)<!--\\" + options.prefix_end + "\\1-->/";
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.forEach(function(filepath) {
        if (!grunt.file.exists(filepath)) {
            return;
          }
        var src = grunt.file.read(filepath, {
            encoding: options.encoding
          });

        var wholeFileName = filepath.replace(regObj.wholeFileName, '');
        var fileName = wholeFileName.replace(regObj.fileName, '$2');
        var fileSuffix = wholeFileName.replace(fileName, '');
        var blockCode = src.match(eval(regObj.blockCode));

        var blockList = [];
        var replaceArray = [];
        if (blockCode) {

          for (var i = 0; i < blockCode.length; i++) {
            blockList.push(blockCode[i].match(eval(regObj.blockList)));
          }
          if (blockList.length > 0) {
            for (var j = 0; j < blockList.length; j++) {
              replaceArray = blockList[j];
              src = src.replace(replaceArray[0], '#parse("' + replaceArray[1] + '")');
              grunt.file.write(f.dest + 'block-' + fileName + '-' + replaceArray[1] + fileSuffix, replaceArray[0], {
                encoding: options.encoding
              });

              grunt.log.writeln('File "' + f.dest + 'block-' + fileName + '-' + replaceArray[1] + fileSuffix+ '" created.');
            }
          }

        }
        // Write the destination file.
        grunt.file.write(f.dest + wholeFileName, src, {
          encoding: options.encoding
        });

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + wholeFileName+ '" created.');
      });

    });
  });

};