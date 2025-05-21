<?php
/**
 * Plugin Name:         Circle Progress Bar Block
 * Description:         A customizable circle progress bar block for displaying progress, statistics, or metrics.
 * Requires at least:   6.0
 * Requires PHP:        7.4
 * Version:             1.0.0
 * Author:              Shafayat Hossain
 * Author URI:          https://jqsafi.github.io
 * License:             GPL v2 or later
 * License URI:         https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         circle-progress-bar
 * Domain Path:         /languages
 *
 * @package            circle-progress-bar
 * @author             Shafayat Hossain
 * @copyright          2024 Shafayat Hossain
 * @license            GPL-2.0-or-later
 *
 * Circle Progress Bar Block is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * Circle Progress Bar Block is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
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
