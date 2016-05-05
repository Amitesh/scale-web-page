# Scale Web page

It is a small plugin to scale the content of given container. It has lots of different options to control the scaling of content. It is using `CSS3` `transform: scale(...)` property to scale the content.

For more details about the options check out the `scale-page.js` file.

## How to use

Here is an example:

```javascript
$(document).ready(function() {
      var scalePage = new ScalePage({
      baseWidth: 500,
      baseHeight: 400,
      scaleBy: 'best-fit',
      containerToPosition: '.container',
      showInfo: true
  });
  scalePage.init();
});
```

## A sample Html markup

```html
<body class="scale-container">
  <div class="container"></div>
</body>
```

### Things to keep in consideration while using scaling feature 
- If you are using positions from mouse events (event.pageX or event.pageY) then it has to use the scaling factor with it.
- Drag & Drop will not going to work as per the expectation. Need to apply scale factor.

Thank you for stop by this plugin. If you have any queries or doubts the feel free to create issue here. 

At the end, let me know your feedback about the plugin. :)