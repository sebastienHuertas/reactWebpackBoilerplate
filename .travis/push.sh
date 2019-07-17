#!/bin/sh

setup_git(){
    git config --global user.email "$GIT_USER_MAIL"
    git config --global user.name "$GIT_USER_NAME"
}

merge_files(){
    git checkout $BRANCH_TARGET
    git merge $CURRENT_BRANCH
    git commit -m 'Branch merge by $GIT_USER_NAME'
    git push origin master
}

echo $GIT_USER_MAIL 
echo $GIT_USER_NAME 
