<template>
    <div class="top-bar noselect">
        <side-nav-button></side-nav-button>
        <span class="top-bar-left-title m-left-10">{{ title }}</span>
        <div class="top-bar-right valign-center">
            <select-locale id="top-bar-locale"></select-locale>
            <user-info id="top-bar-user"></user-info>
        </div>
    </div>
</template>

<script>
    import SelectLocale from './SelectLocale.vue'
    import UserInfo from './UserInfo.vue'
    import SideNavButton from './SideNavButton.vue'
    import bus from '../../tool/bus.js'
    import mixin from '../../tool/mixin.js'

    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        data : function() { 
            return {
                menuLabelKey : 'menu.home',
                title : this.translate('menu.home.title')
            }
        },
        methods : {
            setTranslation() {
                this.title = this.translate(this.menuLabelKey+'.title')
            }
        },
        components : { SelectLocale, UserInfo, SideNavButton },
        mounted: function () {
            this.$nextTick(function () {
                bus.listen(bus.SIDENAV_CHANGE, 'TopBar', (menu) => {
                    this.menuLabelKey = menu.id
                    this.setTranslation()
                })
                bus.listen(bus.LOCALE_CHANGE, 'TopBar', () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>