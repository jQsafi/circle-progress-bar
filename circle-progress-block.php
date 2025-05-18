<?php
/**
 * Plugin Name:         Circle Progress Bar Block
 * Description:         A customizable and animated circle progress bar block.
 * Requires at least:   6.0
 * Requires PHP:        7.4
 * Version:             1.0.0
 * Author:              Shafayat Hossain
 * Author URI:          https://jqsafi.github.io
 * License:             GPL v2 or later
 * License URI:         https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         circle-progress-bar
 * Domain Path:         /languages
 */

function cpb_register_block() {
    $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

    wp_register_script(
        'cpb-block-editor',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version'],
        true // Load in footer
    );

    register_block_type('circle-progress-bar/progress', [
        'editor_script' => 'cpb-block-editor',
        'render_callback' => function($attributes, $content) {
            if (! is_admin()) {
                wp_enqueue_script('cpb-block-editor');
            }
            return $content;
        },
    ]);
}
add_action('init', 'cpb_register_block');
