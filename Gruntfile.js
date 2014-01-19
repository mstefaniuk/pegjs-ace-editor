module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'src/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    bower: {
      install: {
        options: {
          layout: "byType",
          cleanBowerDir: true
        }
      }
    },
    clean: {
      target: ["target"],
      bower: ["lib"]
    },
    peg: {
      options: {exportVar: "parser", allowedStartRules: ['grammar','rule','expression']},
      pegjs: {
        src: "src/grammar/pegjs.pegjs",
        dest: "target/parser/pegjs.js"
      }
//      ,
//      expression: {
//        src: "src/grammar/expression.pegjs",
//        dest: "target/parser/expression.js"
//      }
    },
    file_append: {
      default_options: {
        files: {
          'target/parser/pegjs.js': {
            prepend: "define(['utils'], function (utils) {\nvar ",
            append: "\nreturn parser;\n});"
          }
        }
      }
    },
    copy: {
      src: {
        cwd: 'src',
        src: ['**/*.js'],
        dest: 'target/',
        expand: true
      }
    },
    watch: {
      page: {
        files: ['src/**', 'spec/**'],
        tasks: ['build', 'check']
      },
      options: {
        interval: 500
      }
    },
    nodestatic: {
      work: {
        options: {
          port: 9999,
          keepalive: true,
          dev: true
        }
      },
      test: {
        options: {
          port: 9999,
          dev: true
        }
      }
    },
    jasmine: {
      parser: {
        options: {
          specs: 'spec/*-spec.js',
          helpers: 'spec/*-helper.js',
          styles: 'spec/*-helper.css',
          host: 'http://127.0.0.1:9999/',
          keepRunner: true,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              baseUrl: "target",
              paths: {
                text: '../lib/requirejs-text/text',
                ace: '../lib/ace',
                pegjs: '../lib/pegjs/peg-0.8.0.min',
                spec: '../spec'
              },
              shim: {
                pegjs: {
                  exports: "PEG"
                }
              }
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodestatic');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['clean:target', 'peg', 'copy', 'file_append']);
  grunt.registerTask('test', ['nodestatic:test', 'jasmine']);
  grunt.registerTask('check', ['jasmine']);
  grunt.registerTask('all', ['clean', "bower:install", 'peg', 'copy', 'file_append', 'test']);
};