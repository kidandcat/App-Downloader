riot.tag2('app-bar', '<div class="mui-appbar"> <yield></yield> </div>', '', '', function(opts) {
});

riot.tag2('form-field', '<div class="mui-textfield mui-textfield--float-label"> <input type="{type}" id="{id}" placeholder="{placeholder}"> <label for="{id}">{label}:</label> </div>', '', '', function(opts) {
        this.type = opts.type;
        this.label = opts.label;
        this.id = opts.pid || this.label;
        this.placeholder = opts.placeholder;
});

riot.tag2('main-form', '<div class="mui-container"> <div class="mui-panel"> <form-field type="text" pid="url" label="URL"></form-field> <form-field pid="email" label="Email" type="email"></form-field> <button class="mui--z2 mui-btn mui-btn--primary" id="submit">Download</button> </div> </div>', '', '', function(opts) {
});

riot.tag2('modal-loading', '', '', '', function(opts) {
        window.activateModal = function() {

            var loader = document.createElement('div');
            loader.style.position = "fixed";
            loader.style.top = '50%';
            loader.style.left = '50%';
            loader.style.transform = 'translate(-50%,-50%)';
            var img = document.createElement('img');
            img.src = 'img/ring.svg';
            loader.appendChild(img);

            mui.overlay('on', loader);
        }
        window.deactivateModal = function() {
          mui.overlay('off');
        }
});
