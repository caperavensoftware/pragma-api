const gulp = require("gulp");
const Publish = require("build-utilities/publish");

gulp.task('build:publish', ['build:all', 'build:dist'], function() {
    const publish = new Publish();

    publish.publish([
        {
            src: ["distribute/amd/api/**/*.*"],
            dest: "publish/amd"
        },
        {
            src: ["distribute/commonjs/api/**/*.*"],
            dest: "publish/commonjs"
        },
        {
            src: ["distribute/systemjs/api/**/*.*"],
            dest: "publish/systemjs"
        },
        {
            src: ["distribute/amd/index.js"],
            dest: "publish/amd"
        },
        {
            src: ["distribute/commonjs/index.js"],
            dest: "publish/commonjs"
        },
        {
            src: ["distribute/systemjs/index.js"],
            dest: "publish/systemjs"
        }
    ]);

    publish.setPackage({
        src: "package.json",
        dest: "publish/"
    });
});