const gulp = require("gulp");
const Publish = require("build-utilities/publish");

gulp.task('publish', ['build:all', 'build:dist'], function() {
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
        }
    ]);

    publish.setPackage({
        src: "package.json",
        dest: "publish/"
    });
});