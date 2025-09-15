+++
title = "Devlog: Extending legacy code, layered artwork (part 2)"
date = 2025-09-15
description = "Pre-press software development in PHP"

[taxonomies] 
tags = ["svg", "js", "ecommerce", "image processing", "prepress", "domdocument"]
+++

*This is the second post in this series, check out out my [first post in the series](@/blog/extending-legacy-code-p1.md).*

Hey guys, In this post ill be reviewing how to use the PHP DOMDocument class to add some advanced prepress capabilities to PHP prepress software. My main use of it so far has been splitting one SVG into 2 based on some condition and adding cut lines to the print files. But I'm sure there are way more use cases out there.

I mentioned in the last post, XML and SVG files have a sibling relationship. I don't think that was the most accurate analogy, I think the most accurate way to describe the relationship is saying that **every SVG file is an XML file**. Which begs the question:

> What does all this have to do with the usage of PHP's DOMDocument class?

Turns out it has a lot to do with it. But first, lets take a look at the official description of  the DOMDocument class:

 >(DOMDocument) Represents an entire HTML or XML document; serves as the root of the document tree

*DOMDocument's methods often refer to other PHP 'DOM' classes like DOMElement and DOMNode. But for the purposes of prepress software and SVGs, DOMDocument and DOMElement are the most pertinent*

With this in mind we know that our SVG can be converted to an "editable" instance in code with loadXML(). From there, we can do the real processing with it's other methods. We can use methods like getElementsByTagName(), createElement() and append() to do more advanced processing of the SVG file. The main task will be splitting up the parts of the artwork that need to be printed separately. In my case i was just working with a top and bottom layer. 

### Separating Layered Artwork into printable top and bottom layers

For this to work on a UV printer, or really any printer, we will need to print the top and bottom layer separately. 

*There may be some manufacturing processes that do the printing of both layers after the layers are already affixed together. But most processes require you to print each layer separably and then assemble the layers after printing. At my company we do the latter, and that's the angle I'll be coming from with my software*

The meat and potatoes of this step are pretty straight forward. We are starting out with one SVG and by the end we will need 2 SVGs. One for top layer and one for bottom. 

In manufacturing software it's helpful to think of your inputs as non-physical, virtual items and your outputs are real life physical things. This is unusual IO for most kinds of software, especially in PHP, so keep that in mind.

1. Set up empty DOMElements to contain the final top and bottom layer SVGs.
```php
// Setting up empty svg to hold the eventual bottom layer
$bottomLayerSvg = new DOMDocument('1.0', 'UTF-8');
        $bottomLayerSvg->preserveWhiteSpace = true;
        $bottomLayerSvg->formatOutput = false;
        $bottomLayerSvgRoot = $bottomLayerSvg->createElementNS('http://www.w3.org/2000/svg', 'svg');
        $bottomLayerSvgRoot->setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
```
1. Loop through all the input SVG's inner elements to pick out the layers and place each layer in it's respective DOMElement from step 1. 
```php
// Iterate over <g> elements and append to respective blank SVGs
// This how to split the SVG 
foreach ($gElements as $g) {
	// You can split on any condition! Just inspect $g to decide what you need to do.. Might be a good place to split your decision making logic into a new class!
	if ($someCondition) {
		// This is the special group for bottom layer
		$importedGBtm = $bottomLayerSvg->importNode($g, true);
		$bottomLayerSvgRoot->appendChild($importedGBtm);
	}
	else {
		// some default processing, etc..
	}	
}
```
1. Any layers that are not identified as top or bottom should go on the very top. These are text and custom images from the customer.
2. Add the appropriate cut line overlays to each layer.

Seems pretty simple on the surface, but there are a few pits that you can easily tumble into while you are setting this up. 

## Pitfall #1: Nested SVG elements

For my project I was expecting the SVGs to come in a more or less standardized format. This is because we control the customization tool where these images are being created by customers. But every now and then, we can get nested elms.

Consider a typical SVG is structured like this:
```xml
<svg>
	<g>..some background image..</g>
	<g>..some text or something..</g>
	<g>
		<g>..what if what im looking for is in here?..</g>	
	</g>
	<g>..etc..</g>
</svg>
```

There is many ways to solve this problem. In my case, I ended up writing some code that will flatten out the SVG So that all the elements are top level, then i just loop through them normally and run my decision code on each element. This helped me simplify the logic a bit. You may choose a different path here depending on your I/O requirements.

## Pitfall #2: Understanding cut lines

Before any artwork can be sent to our UV printers, the shape of the thing (sign/name tag/etc..) must be cut from the big piece of plastic or metal. To make sure we can accommodate this we need to add a red line around the border of our SVG file, we call this the cut line.

My first swing at this was to add another layer to the SVG with a red out line on top of a transparent image. This looked okay in the image, but when the artwork went to the cutter machine, it was unable to read the cut line. This was because there was a few things that I still needed to implement to ensure a machine readable cut line.

#### Cut line requirements (non-negotiable):
1. Must be a vectored line. Not a raster line. 
2. Must be conjoined. Meaning that it is a fully connected shape with no loose ends. Remember our output is a physical object. Make sure your code is not doubling up adding cut lines or your could be risking a fire inside your laser cutter.
3. Must be a hairline according to your cutter, for ours that means .003pt thickness

Once your cut line layer meets all these requirements, it's ready to add to your SVG with DOMDocument->appendChild($cutlineElm).

At this point you have a production ready file!

Thanks for reading up to this point. If you're working on a project like this, please feel free to reach out to me on LinkedIn (Adam Dew), it would be nice to talk with someone who is working on similar projects!

*There may be one more post in this series centered around carrying this project the last few meters to the finish line, so stay tuned*

-Happy trails












