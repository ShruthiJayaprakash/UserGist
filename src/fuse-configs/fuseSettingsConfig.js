const fuseSettingsConfig = {
    layout          : {
        style : 'layout1',
        config: {
            scroll : 'content',
            navbar : {
                display : false,
                folded  : false,
                position: 'left'
            },
            toolbar: {
                display : false,
                style   : 'fixed',
                position: 'below'
            },
            footer : {
                display : false,
                style   : 'fixed',
                position: 'below'
            },
            leftSidePanel : {
                display : false,
            },
            rightSidePanel : {
                display : false,
            },
            mode   : 'fullwidth'
        }
    },
    customScrollbars: true,
    theme           : {
        main   : 'default',
        navbar : 'mainThemeDark',
        toolbar: 'mainThemeLight',
        footer : 'mainThemeDark'
    }
};

export default fuseSettingsConfig;