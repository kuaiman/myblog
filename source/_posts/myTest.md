title: myTest
date: 2017-11-02 10:24:36
tags:
---
前两天在闲逛别人博客的时候，无意间发现了有个人的博客访问速度极快，于是乎好奇研究了一下。在查看代码的时候发现了一个`jquery.pjax.min.js`。上网查了查资料，这确实是速度快的原因。
`Pjax`的主要原理是利用`ajax`异步请求页面并局部刷新，利用`pushState`修改url和history，这样就既拥有了`ajax`局部刷新的优势，同时也避免了只利用`ajax`的单页面应用url不会变化，不利于SEO，还避免了浏览器的前进后退也失效的问题。[github](http://www.github.io)、Google+都在使用这样的技术。除了以上的优点以外，页面切换浏览器不会白屏，还能添加自己的过度动画这点也着实很有吸引力。非常适用于静态博客这种每次页面切换基本只有主体内容会变化的情况。

本文的内容旨在记录本博客引入pjax的过程，效果可以参考[本博客](http://www.pangjian.info)。本文讲解的引入过程特指jQuery插件版，可以查看github上的[jquery-pjax](https://github.com/defunkt/jquery-pjax)。

# 效果
不看广告，先看疗效。引入pjax前切换一次页面的请求
![引入pjax前](/resources/using-pjax/pajax_before.png)

引入pjax后...
![引入pjax后](/resources/using-pjax/pjax_after.png)
效果还是很明显的，请求减少到了3次，大量已经引入的资源文件由于没有刷新，没有重复请求。速度也大大提升了。