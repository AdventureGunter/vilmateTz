/**
 * Created by Stas on 29.07.2017.
 */
const gulp = require('gulp');
const fs = require('fs');
const GulpSSH = require('gulp-ssh');
const config = require('config');

let gulpConfig = {
    host: '207.154.247.61',
    username: config.remoteData.username,
    passphrase: config.remoteData.passphrase,
    privateKey: fs.readFileSync('./.ssh/private.ppk'),
};

let gulpSSH = new GulpSSH({
    ignoreErrors: true,
    sshConfig: gulpConfig
});

gulp.task('run-pull', function() {
    return gulpSSH
        .exec('cd ' + config.serverFolder + '&& cd vilmateTz && git config credential.helper store && git fetch && git pull')
        .pipe(gulp.dest('logs'));
});

gulp.task('run-install-packages', function() {
    return gulpSSH
        .exec('cd ' + config.serverFolder + '&& cd vilmateTz && npm i --silent')
        .pipe(gulp.dest('logs'));
});

gulp.task('run-build', function() {
    return gulpSSH
        .exec('cd ' + config.serverFolder + '&& cd vilmateTz && npm run build')
        .pipe(gulp.dest('logs'));
});

gulp.task('run-restart-server', function() {
    return gulpSSH
        .exec('cd ' + config.serverFolder + '&& cd vilmateTz && pm2 restart ' + config.pm2name)
        .pipe(gulp.dest('logs'));
});