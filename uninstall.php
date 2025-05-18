<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @package Circle_Progress_Bar
 */

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

// Currently, this plugin doesn't store any database data to clean up.
// If you add options or custom post types in the future, clean them up here.
