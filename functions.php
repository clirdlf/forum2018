<?php

add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );

// don't use emoji
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

function enqueue_parent_styles()
{
  wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

  // Include webfont versions of logos (and opensource Albertus)
  // Production CDN
  // wp_enqueue_style( 'clir-logo-fonts', 'https://rawgit.com/clirdlf/logo-fonts/master/style.min.css');
  // wp_enqueue_style( 'clir-fonts', 'https://rawgit.com/clirdlf/logo-fonts/master/clir-font/stylesheet.min.css');

  // custom scripts - be sure to compile this with Gulp task (e.g. gulp js)
  wp_enqueue_script('scripts', get_stylesheet_directory_uri() . '/js/scripts.js', array('jquery'));
}

add_theme_support('post-thumbnails');

add_image_size('background-image', 1920, 1000, true);
add_image_size('background-tablet', 1024, 540);
add_image_size('background-mobile', 768, 768);
