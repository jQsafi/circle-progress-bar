=== Circle Progress Bar Block ===
Contributors: jqsafi
Donate link: https://profiles.wordpress.org/jqsafi
Tags: progress, circle, block-editor, gutenberg, progress-bar
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A customizable circle progress bar Gutenberg block for displaying progress, statistics, or metrics in a visually appealing way.

== Description ==

Circle Progress Bar Block is a modern Gutenberg block plugin that adds beautiful circular progress indicators to your WordPress site. Perfect for displaying progress, statistics, or metrics in a visually appealing way.

== Source Code ==

All uncompiled source code is included in this plugin. The production code in `build/index.js` is compiled from:

= Main Source File =
Located at `src/index.js`, this is the complete React source code for the block:

```javascript
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ColorPicker,
    TextControl,
    SelectControl,
} from '@wordpress/components';

registerBlockType('circle-progress-bar/progress', {
    title: 'Circle Progress Bar',
    icon: 'chart-pie',
    category: 'widgets',
    description: 'A customizable circle progress bar.',
    keywords: ['progress', 'circle', 'chart'],
    supports: { html: false },
    attributes: {
        percentage: { type: 'number', default: 75 },
        size: { type: 'number', default: 100 },
        strokeColor: { type: 'string', default: '#00aaff' },
        bgColor: { type: 'string', default: '#e6e6e6' },
        text: { type: 'string', default: 'Progress' },
        useShadow: { type: 'boolean', default: false },
        useGradient: { type: 'boolean', default: false },
        strokeWidth: { type: 'number', default: 10 },
        fontSize: { type: 'number', default: 20 },
        fontColor: { type: 'string', default: '#333' }
    },

    // Full source code available in src/index.js
    // See GitHub repository for complete implementation
});
```
```

= Build Tools =
The production code is generated using standard WordPress tools:
* `@wordpress/scripts` - For development and build
* Webpack - For module bundling
* Babel - For modern JavaScript compatibility

= Building from Source =
1. The source is in `src/index.js`
2. Build tools are configured in `package.json`
3. To compile:
   ```bash
   npm install
   npm run build
   ```
4. Output goes to `build/index.js`

= Directory Structure =
To work with the source code:
1. Clone the GitHub repository: [https://github.com/jqsafi/circle-progress-bar](https://github.com/jqsafi/circle-progress-bar)
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Build production version: `npm run build`

= Features =

* **Fully Customizable Design**
    * Adjustable circle size and stroke width
    * Custom colors for progress bar, background, and text
    * Optional gradient effects
    * Configurable font size and text
    * Shadow effects available

* **Block Editor Integration**
    * Easy to use block controls
    * Live preview in editor
    * Works with Full Site Editing (FSE)
    * Multiple instances support

* **Performance Optimized**
    * Lightweight SVG-based rendering
    * No external dependencies
    * Optimized for modern browsers

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. In the Block Editor, click the (+) icon to add a new block
4. Search for "Circle Progress" or find it under the "Widgets" category
5. Add the block to your page or post

== Usage ==

= Basic Configuration =

1. After adding the block, set your desired percentage (0-100) in the block settings panel
2. Customize the appearance:
   * Change circle size using the "Size" slider
   * Adjust stroke width using the "Thickness" slider
   * Set colors for the progress bar, background, and text
   * Enable/disable gradient effect
   * Add custom text above or below the percentage

= Advanced Features =

* **Shadow Effects**: Enable and customize shadow effects in the "Effects" panel
* **Text Options**: Configure font size, weight, and position

== Changelog ==

= 1.0.0 =
* Initial release with full customization 

== Screenshots ==

1. Circle Progress Bar showing percentage with custom text
2. Block settings panel with all customization options
3. Multiple progress bars with different styles and colors
4. Progress bar with gradient effect enabled
5. Dark theme compatibility view

== Frequently Asked Questions ==

= Is this compatible with Full Site Editing (FSE)? =

Yes, it's fully compatible with block-based themes and Full Site Editing.

= Can I use multiple progress bars with different styles? =

Yes, you can add multiple instances of the block, each with its own unique settings for colors, size, and animation.

= Does it work with all modern browsers? =

Yes, the plugin uses SVG which is supported by all modern browsers. It's tested and works perfectly with Chrome, Firefox, Safari, and Edge.

= Where can I find the source code? =

The uncompiled source code is included in the `src` directory of this plugin and documented in the Source Code section at the top of this readme. You can also find it on GitHub at [https://github.com/jqsafi/circle-progress-bar](https://github.com/jqsafi/circle-progress-bar).

== Development ==

The Circle Progress Bar Block is developed using modern JavaScript and follows WordPress coding standards. The source code is available on GitHub:

* GitHub Repository: [https://github.com/jqsafi/circle-progress-bar](https://github.com/jqsafi/circle-progress-bar)

= Building from Source =

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. For development with live reload:
   ```
   npm start
   ```
4. For production build:
   ```
   npm run build
   ```

The plugin uses the following build tools:
* @wordpress/scripts for development and build processes
* webpack for bundling
* Babel for JavaScript transpilation
* ESLint and Prettier for code formatting

Source files are located in:
* `src/` - Uncompiled JavaScript source code
* `build/` - Compiled and minified production code

== Upgrade Notice ==

= 1.0.0 =
Initial release of Circle Progress Bar Block. Includes all core features with full block editor integration.

