let mix =require('laravel-mix')
mix.js('views/js/app.js', 'public').setPublicPath('public');
mix.sass('views/scss/app.scss', 'public').setPublicPath('public');
