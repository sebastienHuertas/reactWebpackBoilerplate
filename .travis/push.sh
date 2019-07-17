#!/bin/sh
ftp -n $DEPLOY_HOST $DEPLOY_PORT << END_SCRIPT
quote USER $DEPLOY_LOGIN
quote PASS $DEPLOY_PASSWORD

put $TRAVIS_BUILD_DIR/dist

quit
END_SCRIPT
exit 0