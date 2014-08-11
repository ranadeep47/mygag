mygag
=====
A small 9gag clone made in a weekend to tinker with backbone and browserify

I made it primarily to test memory leaks and learn memory profiling in chrome dev tools, so i made sure there are no memory leaks when switching between views

[No leaks](http://i.imgur.com/PCfGz3i.png)

Comparing snapshot2 (take after view changes) with snapshot1 shows the old views are deleted and new views are created without any leaks .

The app uses imgur's free image api to obtain images according to the subreddit chosen 

Feel free to fork it and make it more fun and also make all your config changes in the `config.js` file.

Hosted for free on openshift's node and mongodb catridge . 