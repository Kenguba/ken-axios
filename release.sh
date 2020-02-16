#!/usr/bin/env sh  #用来表示它是一个 shell 脚本
# set -e #告诉脚本如果执行结果不为 true 则退出
funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
# funWithReturn
echo "你当前的版本号为："
npm view kim-axios version
echo "请输入的版本号<Enter release version>:"
read VERSION  #表示从标准输入读取值，并赋值给 $VERSION 变量
read -p "你确定你的版本号为$VERSION?<Releasing are you sure is $VERSION?> (y/n)" -n 1 -r
echo  #输出空值表示跳到一个新行，# 在 shell 脚本中表示注释

#表示 shell 脚本中的流程控制语句，判断 $REPLY 是不是大小写的 y，如果满足，则走到后面的 then 逻辑
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "你的package包的版本已经设置为：$VERSION ..."

  git add -A  #表示把代码所有变化提交到暂存区
  git commit -m "[build] $VERSION"  #表示提交代码，提交注释是 [build] $VERSION
  npm version $VERSION --message "[release] $VERSION" #是修改 package.json 中的 version 字段到 $VERSION，并且提交一条修改记录，提交注释是 [release] $VERSION
  git push -u origin master  #是把代码发布到主干分支

  npm publish #是把仓库发布到 npm 上，我们会把 dist 目录下的代码都发布到 npm 上，因为我们在 package.json 中配置的是 files 是 ["dist"]
  cd .dist
  ls .
  git init 
  git add . 
  git commit -m "[build] $VERSION"  #表示提交代码，提交注释是 [build] $VERSION
  git remote add origin https://gitee.com/KimGuBa/kim-axios.git
  
fi