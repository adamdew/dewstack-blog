+++
title = "Devlog: Extending legacy code, layered artwork (part 1)"
date = 2025-09-04
description = "There's not that many mines in this minefield..."

[taxonomies] 
tags = ["svg", "js", "ecommerce", "image processing"]
+++
# 

 
 *This is part 1 of a multi part post, more parts coming soon*

About 6 months ago, one of my coworkers asked me about doing layered artwork in our product customization tool. At the time we just wanted to know if it was possible, we had a few conversations about it, I looked at the code base I’d be working in, and in the end it just seemed to big of a fish to fry at that particular time.

Before this we had never done layers before (that I know of). We had done 2 sided stuff before, but layered things? That was gonna ask our system to take an artwork file and split it into 2 based on some condition. To get these on our UV printers we have to separate the layers and print them.

- How can we identify layers in a flat image coming out of the customization tool?

- Can our customization tool handle this and not be totally confusing for the customer?

- How can we design this in a way that gives the customer power, without making our catalog manager go insane managing the options?

- How can we integrate this with our brand new ERP?

I so badly wanted to get started but I needed more time to plan because I had more questions than answers. I had other projects in the works that were higher priority. There seemed to be so many different rabbit holes and booby traps I could easily fall into. At the same time, I really liked the idea of developing a whole new product line. This could be the competitive advantage that we so badly needed. All we need to make this happen is some creative thinking and building. Intellectual capital, now you’re speaking my language.

The way these things work you usually have one build cycle to get it done. We don’t have time to go back to the drawing board if my first build sucks. If I was going to take this project on, I had to know that my project would live and succeed on the first try.

### Secret secrets

I started building, kinda in secret for the first week or so, I didn’t want people to know I was working on it because I was not sure if what I was being asked to do was possible or not for our company's systems. I had to figure out where to start before I mustered the troops. Turns out where I started would guide my philosophy on this project.

The question I found myself repeating most often was: How can I make this feature work without disrupting the rest of the code base? This way of thinking led me to the idea of writing new code, hooking into what exists, but not modifying what was already there. Fresh tarmac.

There’s always this fear of legacy code bases, it’s the same thing as fear of the unknown. We don't want to mess with things we don't understand. It’s an obvious recipe for disaster. But here’s the thing with legacy code, you don't have to fully download every morsel of it into your brain. Rather you need to understand the input, output and the little (and I emphasize little) slice where your project will live. Once you have that down it’s time to hook in. 

### Scope in, hook it up

How can I identify a particular SVG to be processed as “layered”? Here were my options:  
  
1. Record it in the database and look it up at processing time - Pro: Easy to find and identify, Con: A bit outside the scope of where my feature needs to live, would need to edit the existing code and possibly change the table structure 😵‍💫.

2. SVG Metadata: add some metadata to the actual svg file, something to tell the artwork processor that it needs to do something different this time for this file. Pros: Super tight scope, dont have to worry about other processing being interrupted because only my layered artwork files will get the new metadata. Cons: Regex will have to be bulletproof, and this will need to be tested thoroughly. 👌

I like the second one more but ill need to find a clean way to inject this metadata. Let’s try a simple regular expression with a replace.
  
```javascript
if(isLayeredArtwork){ // <-- bool from product customization tool, gets initialized on products that have the "layered" custom options
	image = image.replace(
		/<svg[^>]*>/, // <- look inside the svg tag and add a child elm
		match => `${match}\n <desc>layeredArtwork</desc>` // <- child elm to 	add (metadata)
	);
}

```
And the result:
```xml
<svg>
	<desc>ThisIsLayeredArtwork</desc>
	<g><path>Layer One</path></g>
	<g><path>Layer Two</path></g>
</svg>
```
  
I have to do it in the product customization tool layer because that’s what generates the SVG to begin with.  I'd had enough convos with ChatGPT to know that what I was dealing with was just parsing a fancy XML file. Who knew that SVG and XML are brother/sister? Now that I know that, I know that when the SVG makes it to my back-end, I can use my handy dandy [PHP DOMDocument](https://www.php.net/manual/en/class.domdocument.php) class to split the layers and add the cut-lines. That's gonna make things a lot easier. At this point I know I can get this done in a way that’s gonna work on our UV printers. Time to drop this on the team.

### Quick job in and out, no brain surgery

I wanted my layer splitting code to be like a portal to an island where I’m in charge and I make all the rules, I take some input (an SVG) and I run a bunch of processes on it. I organize the code to my standards and I don't have to worry about outside interference or un-scoped properties.

Once I had my entry point established with the desc tag I wrote a simple conditional to hook into my soon to be feature.

I’ll end this one here. In part 2 of this post I'll talk more about the artwork processing in PHP. Usage of DOMDocument, flattening SVGs, and how I fumbled around with cutlines for a week.

Happy trails!
