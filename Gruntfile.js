
module.exports = function(grunt){
    

    grunt.initConfig({
        qunit: {
            options: {
                '--web-security': 'no',
                coverage: {
                    disposeCollector: true,
                    src: ['demo/demo.js'],
                    instrumentedFiles: 'test-temp/',
                    htmlReport: 'report/coverage',
                    coberturaReport: 'report/',
                    linesThresholdPct: 85
                }
            },
            all: ['demo/*.html']
        }

    });


    grunt.loadNpmTasks('grunt-qunit-istanbul')

    grunt.registerTask('default',['qunit']);
};