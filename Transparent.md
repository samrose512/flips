# About enabling transparent backgrounds

A step-by-step on how to make the app 100x cooler

1. Set the variable `transparentBackground` in the beginning of `main.js` to true.
2. Modify `gruvbox.css` (or whichever theme css you are using) so that the body's background is a color with transparency.
To do this, replace the color with:

```css
    background: rgba([Red intensity (0 to 255)], [Green intensity (0 to 255)], [Blue intensity (0 to 255)], [Alpha (float from 0 to 1)]);
```

And done! To start, use `npm start --enable-transparent-visuals` instead of `npm start`.
