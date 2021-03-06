# XKit

[![Stories In Progress](https://badge.waffle.io/new-xkit/XKit.svg?label=in%20progress&title=In Progress)](http://waffle.io/new-xkit/XKit) [![Build Status](https://travis-ci.org/new-xkit/XKit.svg?branch=master)](https://travis-ci.org/new-xkit/XKit)

XKit is a small extension framework that powers tweaks for Tumblr.

## Get a release build
Currently we support [Firefox](https://addons.mozilla.org/en-US/firefox/addon/new-xkit/) and [Chrome](https://chrome.google.com/webstore/detail/new-xkit/inobiceghmpkaklcknpniboilbjmlald) officially. 
We support Opera unofficially using the same file as the Chrome extension, [which you can download here](https://github.com/new-xkit/XKit/releases).

## Support [![Join the chat at https://gitter.im/new-xkit/support](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/new-xkit/support?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

First, [check the list of issues](https://github.com/new-xkit/XKit/issues), and see if there's something there that looks like the problem you're having. Otherwise, [file a new issue](https://github.com/new-xkit/XKit/issues) or come join our support chat; visit our [live support page](http://new-xkit-support.tumblr.com/support) or join our [Gitter chat](https://gitter.im/new-xkit/support) if you have a GitHub account. We don't bite!

## Contribute
XKit needs all the help it can get! If you want to help out, the first step is
finding something going wrong. There's a long list of known issues
[on our issues page](https://github.com/new-xkit/XKit/issues) and
[on the original issues page](https://github.com/atesh/XKit/issues). The next step is to
[fix the bug](https://github.com/new-xkit/XKit/wiki/Fixing-a-bug).

Come join us in [the XKit repo chat](https://gitter.im/new-xkit/XKit) if you get stuck, or want some advice! There's normally a few people lurking in there any time of day.

### Writing a New Extension
Read the guide on [writing a new extension](./docs/extensions/Writing-a-New-Extension.md)!

### Develop XKit
Review the project prerequisites and learn how to [build XKit from source](./docs/contributing/Build-XKit.md).

### Quickstart
In your clone of this repository run:

```sh
npm install
```

To build XKit from source, run:

```sh
gulp build
```

Builds can be found in the `build/` directory.

For a list of available build tasks, see [the documentation](./docs/contributing/Build-XKit.md#gulp-tasks).
