# Circle Progress Bar Block - Technical Documentation

This technical documentation provides detailed insights into the **Circle Progress Bar Block** plugin for WordPress, developed by Shafayat Hossain. It focuses on the plugin’s technical architecture, customization options for developers, and integration details. This plugin is a modern Gutenberg block designed to create customizable circular progress bars for displaying progress, statistics, or metrics in the WordPress block editor.

---

## Plugin Overview

- **Plugin Name**: Circle Progress Bar Block
- **Author**: Shafayat Hossain
- **Version**: 1.0.0
- **Release Date**: May 21, 2025
- **Last Updated**: May 27, 2025
- **Requirements**:
  - WordPress: 6.0 or higher
  - PHP: 7.4 or higher
  - Tested up to WordPress 6.8.1
- **Active Installations**: Fewer than 10 (as of June 3, 2025)
- **Source Code**: Available via SVN repository at [https://plugins.svn.wordpress.org/circle-progress-bar-shafayat-hossain/](https://plugins.svn.wordpress.org/circle-progress-bar-shafayat-hossain/)
- **Purpose**: Provides a Gutenberg block for creating visually appealing circular progress bars with full customization options.

The plugin is built using React and integrates with the WordPress block editor to offer a user-friendly interface for creating and styling circular progress indicators.

---

## Technical Architecture

### Core Files

The plugin’s codebase is structured to leverage the WordPress block editor’s infrastructure, utilizing React for the block’s functionality. Key files include:

- **`src/index.js`**:
  - The primary source file containing the React-based implementation of the block.
  - Defines the block’s registration, attributes, edit, and save functions.
  - Written in JavaScript with JSX for the block editor interface.

- **`build/index.js`**:
  - The compiled production code generated from `src/index.js`.
  - Optimized for performance and used in the live WordPress environment.

- **Other Files**:
  - `package.json`: Defines dependencies and scripts for building the block.
  - `circle-progress-bar-shafayat-hossain.php`: The main plugin file that registers the block with WordPress.
  - CSS and other assets may be included for styling the progress bar in the editor and front end.

### Block Registration

The block is registered using the WordPress Block API (`@wordpress/blocks`). The registration process in `src/index.js` typically includes:

- **Block Type**: `shafayat/circle-progress-bar` (assumed namespace based on author and plugin naming).
- **Attributes**: Define the block’s data, such as:
  - `percentage`: Numeric value (0–100) for the progress bar’s fill level.
  - `color`: String or hex code for the progress bar’s fill color.
  - `size`: String or numeric value for the circle’s diameter (e.g., `small`, `medium`, `large` or pixel-based).
  - `label`: String for optional text displayed with the progress bar.
  - Additional attributes (e.g., `strokeWidth`, `animation`) may be included for styling and effects.
- **Edit Function**: Renders the block’s interface in the Gutenberg editor, allowing users to configure settings via the Inspector Controls panel.
- **Save Function**: Generates the front-end HTML/CSS output for the progress bar.

### Rendering Mechanism

The circular progress bar is likely rendered using a combination of:

- **SVG Elements**: For the circular track and progress indicator, ensuring scalability and smooth animations.
- **CSS**: For styling colors, sizes, and animations (e.g., `stroke-dasharray` for progress animation).
- **JavaScript/React**: For dynamic updates in the editor and handling user inputs.

The front-end output typically consists of an SVG circle with a dynamic `stroke-dashoffset` to represent the progress percentage, styled with user-defined colors and sizes.

---

## Block Attributes

Based on common practices for circular progress bar blocks and the plugin’s description, the block likely supports the following attributes (stored in the block’s JSON data):

| Attribute       | Type   | Description                                      | Example Value        |
|-----------------|--------|--------------------------------------------------|----------------------|
| `percentage`    | Number | Progress value (0–100)                           | `75`                 |
| `color`         | String | Fill color for the progress indicator            | `#00ff00` or `green` |
| `size`          | String | Circle size (e.g., `small`, `medium`, `large`)   | `medium`             |
| `label`         | String | Optional text label for the progress bar         | `Completion Rate`    |
| `strokeWidth`   | Number | Thickness of the progress bar’s stroke           | `10` (pixels)        |
| `animation`     | Boolean | Enable/disable animation for the progress fill   | `true`               |
| `showPercentage`| Boolean | Display the percentage value on the bar          | `true`               |

These attributes can be modified in the block’s edit function and saved to the post’s content as JSON.

---

## Customization for Developers

### Accessing Source Code

The plugin includes uncompiled source code for transparency and customization:

1. **Download Source**:
   - Access via the SVN repository: [https://plugins.svn.wordpress.org/circle-progress-bar-shafayat-hossain/](https://plugins.svn.wordpress.org/circle-progress-bar-shafayat-hossain/).
   - Alternatively, extract the plugin from `wp-content/plugins/circle-progress-bar-shafayat-hossain/` after installation.

2. **Directory Structure**:
   - `src/`: Contains `index.js` (React source code).
   - `build/`: Contains `index.js` (compiled code).
   - `assets/`: May include CSS or image files for styling.
   - `circle-progress-bar-shafayat-hossain.php`: Plugin entry point.

### Modifying the Block

To customize the block’s functionality or appearance:

1. **Set Up Development Environment**:
   - Ensure Node.js and npm are installed.
   - Navigate to the plugin directory and run `npm install` to install dependencies listed in `package.json`.

2. **Edit `src/index.js`**:
   - Modify the block’s attributes to add new settings (e.g., animation duration, gradient fills).
   - Update the `edit` function to add custom controls in the Inspector Controls panel (using `@wordpress/block-editor` components).
   - Adjust the `save` function to alter the front-end output (e.g., add custom HTML or SVG attributes).

   Example modification to add a new attribute for animation duration:
   ```javascript
   // In src/index.js
   registerBlockType('shafayat/circle-progress-bar', {
       attributes: {
           percentage: { type: 'number', default: 50 },
           color: { type: 'string', default: '#00ff00' },
           size: { type: 'string', default: 'medium' },
           animationDuration: { type: 'number', default: 1000 }, // New attribute
       },
       edit: (props) => {
           const { attributes, setAttributes } = props;
           return (
               <div>
                   <InspectorControls>
                       <RangeControl
                           label="Animation Duration (ms)"
                           value={attributes.animationDuration}
                           onChange={(value) => setAttributes({ animationDuration: value })}
                           min={500}
                           max={5000}
                       />
                   </InspectorControls>
                   {/* Existing edit UI */}
               </div>
           );
       },
       save: (props) => {
           const { attributes } = props;
           return (
               <div className="circle-progress-bar" style={{ animationDuration: `${attributes.animationDuration}ms` }}>
                   {/* Existing save output */}
               </div>
           );
       },
   });
   ```

3. **Recompile the Code**:
   - Run `npm run build` to compile `src/index.js` into `build/index.js`.
   - Test the modified plugin in a staging WordPress environment.

4. **Styling**:
   - Modify CSS in the plugin’s stylesheet (if separate) or inline styles in `src/index.js`.
   - For SVG-based progress bars, adjust properties like `stroke`, `stroke-dasharray`, or `stroke-dashoffset`.

### Hooks and Filters

The plugin’s **Advanced** tab on WordPress.org may document specific hooks or filters, but common WordPress block API hooks applicable include:

- **`blocks.registerBlockType`**:
  - Filter to modify the block’s registration settings.
  - Example:
    ```javascript
    wp.hooks.addFilter(
        'blocks.registerBlockType',
        'shafayat/circle-progress-bar',
        (settings, name) => {
            if (name === 'shafayat/circle-progress-bar') {
                settings.attributes.customAttribute = {
                    type: 'string',
                    default: 'default-value',
                };
            }
            return settings;
        }
    );
    ```

- **`editor.BlockEdit`**:
  - Modify the block’s edit interface in the Gutenberg editor.
  - Example: Add a custom control to the Inspector Controls panel.

- **`blocks.getSaveContent.extraProps`**:
  - Alter the block’s saved HTML output.
  - Example: Add a custom class to the progress bar wrapper.

Check the plugin’s **Advanced** tab or source code comments for plugin-specific hooks, as these are not explicitly listed in available data.

### Shortcode Support (Potential)

While the plugin is primarily a Gutenberg block, it may support shortcodes for compatibility with classic editors or widgets, similar to the author’s earlier **Pure CSS Circle Progress Bar** plugin. Example shortcode (based on the older plugin):

```shortcode
[circle_progress_bar percentage="90" color="green" size="big"]Completion Rate[/circle_progress_bar]
```

If supported, the shortcode is processed in `circle-progress-bar-shafayat-hossain.php` using WordPress’s shortcode API (`add_shortcode`). Developers can extend this by:

1. Locating the shortcode handler in the main plugin file.
2. Adding new attributes or modifying the output HTML/CSS.

Example shortcode handler:
```php
function shafayat_circle_progress_bar_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'percentage' => 50,
            'color' => '#00ff00',
            'size' => 'medium',
        ),
        $atts,
        'circle_progress_bar'
    );
    return '<div class="circle-progress-bar" data-percentage="' . esc_attr($atts['percentage']) . '" style="color: ' . esc_attr($atts['color']) . ';">' . $content . '</div>';
}
add_shortcode('circle_progress_bar', 'shafayat_circle_progress_bar_shortcode');
```

---

## Front-End Output

The block’s front-end output is likely an SVG-based circular progress bar with the following structure (based on common implementations):

```html
<div class="circle-progress-bar" data-percentage="75" style="--color: #00ff00; --size: 150px;">
    <svg class="progress-circle" width="150" height="150">
        <circle class="track" cx="75" cy="75" r="70" stroke="#e0e0e0" stroke-width="10" fill="none" />
        <circle class="indicator" cx="75" cy="75" r="70" stroke="#00ff00" stroke-width="10" fill="none" stroke-dasharray="439.6" stroke-dashoffset="109.9" />
    </svg>
    <span class="label">Completion Rate</span>
    <span class="percentage">75%</span>
</div>
```

- **SVG Circles**:
  - `track`: The background circle (usually a light color).
  - `indicator`: The progress circle, animated using `stroke-dasharray` and `stroke-dashoffset` based on the percentage.
- **CSS**:
  - Styles the SVG elements and applies animations (e.g., `transition` for smooth progress updates).
  - Custom properties (e.g., `--color`, `--size`) may be used for dynamic styling.
- **JavaScript**:
  - May handle animation triggers or dynamic updates on page load.

---

## Performance Considerations

- **Lightweight**: The plugin is optimized for the block editor, with compiled code in `build/index.js` minimizing runtime overhead.
- **SVG-Based**: Ensures scalability and low resource usage compared to image-based progress bars.
- **React Efficiency**: Leverages React’s virtual DOM for efficient updates in the editor.

To optimize further:
- Minify CSS/JS assets.
- Use lazy loading for animations on the front end.
- Test with large numbers of blocks to ensure performance.

---

## Debugging and Testing

1. **Editor Issues**:
   - Check the browser console for JavaScript errors in the block editor.
   - Verify that `build/index.js` is correctly compiled.

2. **Front-End Issues**:
   - Inspect the SVG output using browser developer tools.
   - Ensure CSS properties like `stroke-dasharray` are calculated correctly based on percentage.

3. **Testing Environment**:
   - Use a local WordPress setup with debugging enabled (`WP_DEBUG` set to `true` in `wp-config.php`).
   - Test with different themes to ensure compatibility.

---

## Integration with Other Plugins/Themes

- **Compatibility**: The plugin is designed for the Gutenberg editor and works with most WordPress themes. However, theme-specific CSS may override block styles, requiring custom CSS adjustments.
- **Conflicts**: No known conflicts with major plugins, but test with other block plugins (e.g., Ultimate Blocks, Getwid) to ensure no JavaScript/CSS clashes.[](https://shop.gutenberghub.com/product/circle-progress-bar-block)
- **Extensibility**: Can be used alongside other progress bar plugins (e.g., Getwid, Stackable) for varied designs.[](https://motopress.com/blog/getwid-wordpress-blocks-circular-progress-bar-gutenberg-block/)[](https://wpstackable.com/progress-circle-block/)

---

## Limitations and Notes

- **Early Adoption**: With fewer than 10 active installations, the plugin is in its early stages, and long-term support is uncertain.
- **Shortcode Support**: Not explicitly confirmed for this plugin; developers may need to check the source code or contact the author.
- **Advanced Features**: Features like gradient fills or multi-color bars may require custom development, as they are not documented in the plugin’s description.

---

## Resources

- **Plugin Page**: [https://wordpress.org/plugins/circle-progress-bar-shafayat-hossain/](https://wordpress.org/plugins/circle-progress-bar-shafayat-hossain/)[](https://wordpress.org/plugins/circle-progress-bar-shafayat-hossain/)
- **Support Forum**: [https://wordpress.org/support/plugin/circle-progress-bar-shafayat-hossain/](https://wordpress.org/support/plugin/circle-progress-bar-shafayat-hossain/)
- **SVN Repository**: [https://plugins.svn.wordpress.org/circle-progress-bar-shafayat-hossain/](https://plugins.svn.wordpress.org/circle-progress-bar-shafayat-hossain/)
- **Author’s Website**: [https://shafayat.xyz/](https://shafayat.xyz/) (may include related documentation or tutorials)[](https://shafayat.xyz/css/pure-css-circle-progress-bar-wordpress-plugin/)
- **WordPress Block API**: [https://developer.wordpress.org/block-editor/](https://developer.wordpress.org/block-editor/) for general block development guidance.

---

## Example Customization Workflow

To add a gradient fill to the progress bar:

1. Edit `src/index.js` to include a new attribute for gradient colors:
   ```javascript
   attributes: {
       percentage: { type: 'number', default: 50 },
       gradientColors: { type: 'array', default: ['#00ff00', '#0000ff'] },
   }
   ```

2. Update the `save` function to apply the gradient:
   ```javascript
   save: ({ attributes }) => {
       return (
           <div className="circle-progress-bar">
               <svg className="progress-circle" width="150" height="150">
                   <defs>
                       <linearGradient id="gradient">
                           <stop offset="0%" stop-color={attributes.gradientColors[0]} />
                           <stop offset="100%" stop-color={attributes.gradientColors[1]} />
                       </linearGradient>
                   </defs>
                   <circle className="track" cx="75" cy="75" r="70" stroke="#e0e0e0" stroke-width="10" fill="none" />
                   <circle className="indicator" cx="75" cy="75" r="70" stroke="url(#gradient)" stroke-width="10" fill="none" stroke-dasharray="439.6" stroke-dashoffset={439.6 * (1 - attributes.percentage / 100)} />
               </svg>
           </div>
       );
   }
   ```

3. Recompile and test the updated block.

---

This documentation provides a technical foundation for working with the **Circle Progress Bar Block**. For specific hooks, shortcode details, or advanced features, refer to the plugin’s source code or contact Shafayat Hossain via the support forum.[](https://wordpress.org/plugins/circle-progress-bar-shafayat-hossain/)

*Last Updated: June 3, 2025*
