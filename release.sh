#!/usr/bin/env sh
set -e
echo "请输入的版本号<Enter release version>:"
read VERSION  #表示从标准输入读取值，并赋值给 $VERSION 变量
read -p "你确定你的版本号为$VERSION?<Releasing are you sure is $VERSION?> (y/n)" -n 1 -r
echo  # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git remote add origin https://gitee.com/KimGuBa/kim-axios.git
  git push -u origin master

  # publish
  npm publish
fi