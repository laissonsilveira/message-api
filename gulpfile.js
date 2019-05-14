/*eslint no-console: ['error', { allow: ['log', 'error'] }] */
/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
// const moment = require('moment');
// const { writeFileSync } = require('fs');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
// const clean = require('gulp-clean');
// const tar = require('gulp-tar');
// const gzip = require('gulp-gzip');
// const install = require('gulp-install');
// const rename = require('gulp-rename');
const { join } = require('path');

// // Files & Paths
// const DIST_BUILD_META = './build-meta.json';
// const DIST_PATH = 'build/';
// const DEFAULT_PATH = 'home2/tmp/install/';
// const PROJECT_NAME = 'message-api';
// const buildMeta = require(DIST_BUILD_META);
const packageFile = require('./package.json');
const TESTS_PATH = './test/**/*.test.js';

// // =============================================== TEST ====================================================

gulp.task('test', done => {
    process.env.NODE_ENV = 'test';
    return gulp.src(TESTS_PATH, { read: false })
        .pipe(mocha({
            timeout: 10000000,
            exit: true,
            reporter: 'mochawesome',
            reporterOptions: {
                reportDir: join('test/coverage'),
                reportTitle: `Relatório de testes message-api v${packageFile.version}`,
                reportPageTitle: 'Testes message-api'
            }
        }))
        .on('error', err => {
            done(err);
            process.exit(1);
        });
});