module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: false,
        comments: false,
        compact: true,
        minified: true,
        presets: ['@babel/preset-env']
      },
      build: {
        files: {
          "build/js/background.js": "src/js/background.js",
          "build/js/content.js": "src/js/content.js",
          "build/js/popup.js": "src/js/popup.js",
          "build/js/injected.js": "src/js/injected.js"
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        manage: true,
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
          "dist/js/background.js": "build/js/background.js",
          "dist/js/content.js": "build/js/content.js",
          "dist/js/popup.js": "build/js/popup.js",
          "dist/js/injected.js": "build/js/injected.js"
        }
      }
    },
    copy: {
      dist: {
        files: [
          {expand: true, cwd:"src", src: ['res/*', "manifest.json", "popup.html", "js/jquery.min.js"], dest: 'dist/', filter: 'isFile'},
        ]
      },
      build: {
        files: [
          {expand: true, cwd:"src", src: ['res/*', "manifest.json", "popup.html", "js/jquery.min.js"], dest: 'build/', filter: 'isFile'},
        ]
      }
    },
    clean: {
      dist: {
        src: ['dist', 'build']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-clean");

  // Default task(s).
  grunt.registerTask('default', ["del", "babel", "uglify", "copy"]);
  grunt.registerTask('del', ["clean"]);

};