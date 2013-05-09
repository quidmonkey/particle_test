module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var shell = require('shelljs');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      // bake impact game
      bake: {
        command: 'cd tools/ && ./bake.sh && cd .. && mv game.min.js <%= pkg.name %>.min.js'
      },
      // deploy to an android running cocoonjs
      cocoon: {
        command: 'zip <%= pkg.name %>.zip -r * -x "*.DS_Store" && adb push <%= pkg.name %>.zip /sdcard/<%= pkg.name %>.zip',
        options: {
          stdout: true
        }
      },
      // deploy to a remote server
      deploy: {
        command: 'rsync -avz --exclude-from "<%= pkg.excludesFile %>" $PWD <%= pkg.user %>@<%= pkg.server %>:<%= pkg.targetDir %>',
        options: {
          stdout: true
        }
      },
      // expose ig globally for compilation purposes
      expose: {
        command: 'sed -i s/^ig./window.ig./g <%= pkg.name %>.min.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>.min.js <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.min.js',
        dest: '<%= pkg.name %>.min.js'
      }
    }
  });

  // load dependencies
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  // tasks
  grunt.registerTask('default', ['shell:bake', 'uglify']);
  grunt.registerTask('bake', ['shell:bake']);
  grunt.registerTask('build', ['shell:bake', 'uglify']);
  grunt.registerTask('cocoon', ['shell:cocoon']);
  grunt.registerTask('deploy', ['shell:deploy']);
  grunt.registerTask('expose', ['shell:expose']);
  grunt.registerTask('uglify', ['uglify']);

  // tasks built from other tasks
  grunt.registerTask('prepare', 'bake and inject minified script', function () {
    grunt.task.run(['shell:bake', 'uglify', 'inject']);
  });
  grunt.registerTask('publish', 'bake and deploy', function () {
    grunt.task.run(['shell:bake', 'uglify', 'inject', 'shell:deploy', 'revert']);
  });

  // custom tasks
  // remove impact scripts and inject minified script
  grunt.registerTask('inject', 'inject minified script', function () {
    pkg.htmlFiles.forEach(function (fileName) {
      shell.exec('sed -i \
        -e s#lib/impact/impact.js#' + pkg.name + '.min.js#g \
        -e s#lib/game/main.js##g \
        ' + fileName
      );
    });
  });

  // remove minified script and inject impact scripts
  grunt.registerTask('revert', 'revert minified script', function () {
    pkg.htmlFiles.forEach(function (fileName) {
      shell.exec('sed -i \
        -e s#' + pkg.name + '.min.js#lib/impact/impact.js#g \
        -e \'s#\"\"#\"lib/game/main.js\"#g\' \
        ' + fileName
      );
    });
  });

};