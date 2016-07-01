<modal-loading>
    <script>
        window.activateModal = function() {
            // initialize modal element
            var loader = document.createElement('div');
            loader.style.position = "fixed";
            loader.style.top = '50%';
            loader.style.left = '50%';
            loader.style.transform = 'translate(-50%,-50%)';
            var img = document.createElement('img');
            img.src = 'img/ring.svg';
            loader.appendChild(img);

            // show modal
            mui.overlay('on', loader);
        }
        window.deactivateModal = function() {
          mui.overlay('off');
        }
    </script>

</modal-loading>
