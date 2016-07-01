<form-field>
    <div class="mui-textfield mui-textfield--float-label">
        <input type="{type}" id="{id}" placeholder={placeholder}>
        <label for="{id}">{label}:</label>
    </div>


    <script>
        this.type = opts.type;
        this.label = opts.label;
        this.id = opts.pid || this.label;
        this.placeholder = opts.placeholder;
    </script>

</form-field>
