/**
 * 有问题联系 xianhual@jumei.com
 */
module.exports = function (grunt) {

    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            minfy: {
                expand: true,
                cwd: '<%=pkg.cssdir%>',
                src: ['*.css', '!*.min.css'],
                dest: '<%=pkg.mincssdir%>',
                ext: '.min.css'
            },
            ver: {
                expand: true,
                cwd: '<%=pkg.cssdir%>',
                src: ['*.css', '!*.min.css'],
                dest: '<%=pkg.v_cssdir%>',
                ext: '.min.css'
            }
        },
        //SEAJS打包处理
        clean: {
            seajs: ['<%=pkg.jsdir%>.tmp*']
        },
        transport: {
            js: {
                options: {
                    //指定模块的路径,一般指定到sea-modules目录中，此目录为seajs模块目录，所有生成的模块都存在于此目录中
                    paths: ['<%=pkg.modules_dir%>'],
                    //transport时 模块标识前缀，此处使用版本号定义，以使在生成新版本文件夹时，标识能够匹配到
                    idleading: '<%=pkg.v_jsdir%>',
                    alias: {
                        $: 'jquery/jquery/1.10.1/jquery',
                        template: 'artTemplate/template'
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%=pkg.jsdir%>',
                        src: '**/*.*',
                        dest: '<%=pkg.jsdir%>.tmp1'
                    }
                ]
            }
        },
        concat: {
            seajs: {
                options: {
                    //指定合并模式，relative表示合并相对目录中文件，ALL表示合并所有依赖的文件
                    //示例 ：当为"relative"时，require('./xxx')将会被合并，而require('xxx')不会，而值为“all”时，两者皆会
                    include: 'relative'
                }, files: [
                    {
                        expand: true,
                        cwd: '<%=pkg.jsdir%>.tmp1',
                        src: '**/*.js',
                        filter: function (filepath) {
                            return !/-debug\.js$/.test(filepath);
                        },
                        dest: '<%=pkg.modules_dir%>/<%=pkg.v_jsdir%>'
                    }
                ]
            },
            all: {
                options: {
                    include: 'relative'
                }, files: [
                    {
                        expand: true,
                        cwd: '<%=pkg.jsdir%>.tmp1',
                        src: '**/*.js',
                        filter: function (filepath) {
                            return !/-debug\.js$/.test(filepath);
                        },
                        dest: '<%=pkg.jsdir%>.tmp2'
                    }
                ]
            }
        },
        uglify: {
            seajs: {
                files: [
                    {
                        expand: true,
                        cwd: '<%=pkg.jsdir%>.tmp2',
                        src: '**/*.js',
                        dest: '<%=pkg.modules_dir%>/<%=pkg.v_jsdir%>'
                    }
                ]
            }
        },
        //单元测试有测试覆盖率
        qunit: {
            options: {
                '--web-security': 'no',
                coverage: {
                    disposeCollector: true,
                    src: ['scaffold/test/demo/demo.js'],
                    instrumentedFiles: 'test-temp/',
                    htmlReport: 'report/coverage',
                    coberturaReport: 'report/',
                    linesThresholdPct: 10,
                    baseUrl:'.'
                },
                urls: [
                    'http://localhost:8000/scaffold/test/demo/index.html'
                ]
            },
            all: ['<%=pkg.test_dir%>/demo/index33.html']
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        }

    });
    // 载入插件
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
//    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
//    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-qunit-istanbul')
    // 注册任务
    //使用compass合并背景图片
    grunt.registerTask('imagesprites', ['compass:imagesprites']);
    //SEAJS打包任务
//    grunt.registerTask('seajs', ['clean:seajs', 'transport', 'concat:seajs','uglify:seajs', 'clean:seajs']);
    grunt.registerTask('seajs', ['clean:seajs', 'transport', 'concat:seajs', 'clean:seajs', 'qunit']);
    grunt.registerTask('qunit1', ['connect', 'qunit']);

    grunt.registerTask('default2', ['clean:seajs', 'transport', 'concat:seajs', 'clean:seajs','connect', 'qunit', 'cssmin']);
    grunt.registerTask('default', ['clean:seajs', 'transport', 'concat:all', 'uglify:seajs', 'clean:seajs','connect', 'qunit', 'cssmin']);
};