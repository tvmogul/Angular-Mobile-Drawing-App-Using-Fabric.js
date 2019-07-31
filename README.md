# Angular-Mobile-Drawing-App-Using-Fabric.js
Angular Mobile Drawing App Using Fabric.js that is an ImageMap &amp; Animation Editor &amp; Virtual Designer
Summary
This article includes the full source code for both an Angular 8 Fabric.js Image Editor and a plain JavaScript HTML5 ImageMap Editor for laptops. I created these apps that allow you to create an image map from an existing image that can easily be used with the JQuery plugin ImageMapster. In addition, you can also create a Fabric canvas that functions exactly like an image map but with far more features than any image map. I will be updating the source code from time to time with new web tools and features.

The Angular 8 version is designed for use on mobile phones where you might want to layout objects inside a room.

# Introduction
I recently had a client who wanted me to create an HTML5 Virtual Home Designer website with images of homes that users could "color in" like in those crayon coloring books where you have an image with outlines of parts of the image and you paint within the outlines.  But in this case of painting parts of a home like the roof or stonefront you would also want to fill in an outlined areas with patterns where ecah pattern can be different colors. The obvious choice initially was to use image maps of a houses where the user could select different colors and patterns for each area of the image map of a home like the roof, gables, siding, etc. And the obvious choice was to use the popular JQuery plugin for image maps, i.e., Imagemapster. See https://github.com/jamietre/imagemapster

But I still needed a way to create the html <map> coordinates for the image maps of the houses where the syntax would work with the ImageMapster plugin. I didn't like any of the image map editors like Adobe Dreamweaver's Hot Spot Drawing Tools or any of the other editors because they didn't really meet my needs either. So I decided to write my own Image Map Editor which is the editor included in the article.

To create my Image Map Editor I decided to use Fabric.js, a powerful, open-source JavaScript library by Juriy Zaytsev, aka "kangax," with many other contributors over the years. It is licensed under the MIT license. The "all.js" file in the sample project is the actual "Fabric.js" library. Fabric seemed like a logical choice to build an Image Map Editor because you can easily create and populate objects on a canvas like simple geometrical shapes — rectangles, circles, ellipses, polygons, or more complex shapes consisting of hundreds or thousands of simple paths. You can then scale, move, and rotate these objects with the mouse; modify their properties — color, transparency, z-index, etc. It also includes a SVG-to-canvas parser.

I recently added a separate Angular 8 Mobile version of this HTML5 ImageMap Editor and the source code for that is available for download above. To instal the Angular version just download and unzip the file and open the code in VS Code and run in terminal:

npm install
The most important thing about the Angular 8 version is how we add Fabric.js to our Angular Mobile App as follows:

npm i fabric
npm i @types/fabric
Then in our component that will display our Fabric canvas we add:

import { fabric } from 'fabric';

declare var canvas: any;

this.canvas = new fabric.Canvas('swipeCanvas', {
   hoverCursor: 'hand',
   selection: true,
   backgroundColor: '#F0F8FF', 
   selectionBorderColor: 'blue',
   defaultCursor: 'hand'
});

In Angular 8 there is a major change in how we get a reference of application view. Since Angular 8 ViewChild and ContentChild decorators must now have a new option called static that is applied as follows:.

If you add static: true on a dynamic element (wrapped in a condition or a loop), then it will not be accessible in ngOnInit nor in ngAfterViewInit.  

@ViewChild('swipeCanvas', {static: true}) swipeCanvas: ElementRef;
OR, setting it to static: false should behave as you're expecting it to and query results available in ngAfterViewInit.

@ViewChild('swipeCanvas', {static: false}) swipeCanvas: ElementRef;
And it is thats imple to add a Fabric canvas in Angular 8.

To install this app just download and unzip aand load the unzipped folder into VS Code and run in Terminal:
npm install

Then to run this app just enter in Terminal:
ng serve

That's it!

