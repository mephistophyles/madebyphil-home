---
title: MacDown v2026
description: Updating the classic MacDown editor to run natively on Apple Silicon
type: Software
date: 2026-07-07
featured: true
image: /macdown-v2026.png
tags: [objective-c, macos, cocoa, open-source, developer-tools]
status: in-progress
link: https://github.com/mephistophyles/macdown
---

MacDown is a Markdown editor for the Mac that Tzu-ping Chung and a long list of contributors built and maintained for over a decade. It's a great app that's been quietly dying: the toolchain pins Xcode 10.1, the deployment target is macOS 10.8, and it's built on the legacy WebKit `WebView` API that Apple has stripped out of modern WebKit entirely. Compile it fresh today and the preview pane just doesn't render. I'm not the original author. I forked it because I wanted to keep using it.

I forked the original repository, pointed Claude at it and asked it to update it to the modern MacOS. Get it running natively on Apple Silicon first, without changing behavior, then work through the parts that actually touch deprecated APIs. Phase 0 was just proving a clean arm64 build was possible: bumping the deployment target to macOS 11, forcing every CocoaPod to the same target, and replacing the dead Travis CI config with GitHub Actions on an Apple Silicon runner. From there it's been real migration work — replacing the legacy `WebView` preview with `WKWebView` (which is the bulk of the effort, since the old code reaches directly into the DOM from Objective-C and `WKWebView`'s bridge is async-only), upgrading to Sparkle 2 with a hardened runtime and entitlements for notarization, and cleaning out preference XIBs and other cruft that no longer applied.

## Technical Stack

- Objective-C / Cocoa, targeting macOS 11 (Big Sur) and arm64 only
- WKWebView with a custom URL scheme handler replacing the legacy WebView + DOM-walking bridge
- CocoaPods for dependencies (Sparkle, hoedown, handlebars-objc, and others), Xcode/xcodebuild for CI
- GitHub Actions build and test pipeline replacing the old Travis setup

## Conclusion

Claude will happily update an older code base. I fed it the error message Mac was giving me and used that as the directive. I'm not a MacOS developer and have never touched the ecosystem, so I was flying mostly blind here. Each build worked but wasn't quite as solid as I needed, so I gave it feedback about the bug that needed fixing. This was my first truly vibe coded project, because I could read the code but not really interpret it. It's still not fully done, there are still bugs that I'm finding and squashing, but it has now become my daily driver. I still need to contact the original author and let them know what I did and if they're ok with me publishing a signed build with the MacDown name/blessing. I'm not sure how we want to handle maintenance going forward since that's not really something I can handle.