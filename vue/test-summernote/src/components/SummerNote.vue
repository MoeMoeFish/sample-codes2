<template>
    <div class="editor-wrapper">
        <div ref="editor" class="editor">
            <div>Inner</div>
        </div>
        <div class="">
            <div style="width: 100px;height: 40px;border: 1px solid #999;margin-top: 40px;" @click="save" >保存</div>
            <div style="width: 100px;height: 40px;border: 1px solid #999;margin-top: 40px;" @click="restore" >恢复</div>
            <div style="width: 100px;height: 40px;border: 1px solid #999;margin-top: 40px;" @click="insert" >插入</div>
            <input type="button" value="测试" name="test-btn" />
            <input type="input" name="test-text" style="width: 100px;height: 40px;border: 1px solid #999;margin-top: 40px;" />
        </div>
    </div>
</template>
<script>
import $ from 'jquery';

require('bootstrap/dist/js/bootstrap.js');
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('summernote/dist/summernote.css');
require('summernote/dist/summernote.js');
require('summernote/dist/lang/summernote-zh-CN.js');

const HelloButton = function(context) {
    const ui = $.summernote.ui;

    // create button
    const button = ui.button({
        contents: '<i class="note-icon-align-left" />',
        tooltip: '左对齐',
        click() {
            // invoke insertText method with 'hello' on editor module.
            context.invoke('justifyLeft');
        }
    });

    return button.render();
};

const DropDownButton = function(context) {
    console.log(context);
    const ui = $.summernote.ui;
    const options = {
        icons: {
            caret: 'note-icon-caret'
        }
    };

    return ui.buttonGroup([
        ui.button({
            className: 'dropdown-toggle',
            contents: ui.dropdownButtonContents(
                '<span class="note-current-fontname"/>', options
            ),
            tooltip: 'name is long long',
            data: {
                toggle: 'dropdown'
            }
        }),
        ui.dropdownCheck({
            className: 'dropdown-fontname',
            checkClassName: 'menu-check',
            items: ['宋体', '雅黑'],
            title: 'title',
            template: (item) => {
                return '<span style="font-family: \'' + item + '\'">' + item + '</span>';
            },
            click() {
                console.log('click');
            }
        })
    ]).render();
};

const KuickColorButton = function(context) {
    const ui = context.ui;
    console.log(context);
    return ui.buttonGroup({
        className: 'note-color',
        children: [
            ui.button({
                className: 'note-current-color-button',
                contents: ui.icon('note-icon-unorderedlist' + ' note-recent-color'),
                tooltip: 'color',
                click: (e) => {
                    const $button = $(e.currentTarget);
                    context.invoke('editor.color', {
                        backColor: $button.attr('data-backColor'),
                        foreColor: $button.attr('data-foreColor')
                    });
                },
                callback: ($button) => {
                    const $recentColor = $button.find('.note-recent-color');
                    $recentColor.css('background-color', '#FFFF00');
                    $button.attr('data-backColor', '#FFFF00');
                }
            }),
            ui.button({
                className: 'dropdown-toggle',
                contents: ui.dropdownButtonContents('', context.options),
                tooltip: '',
                data: {
                    toggle: 'dropdown'
                }
            }),
            ui.dropdown({
                items: `
<div>
  <div class="note-palette">
    <div class="note-palette-title"> 颜色 </div>
    <div>
      <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit"> 透明 </button>
    </div>
    <div class="note-holder" data-event="backColor"/>
  </div>
  <div class="note-palette">
    <div class="note-palette-title" > 前景色 </div>
    <div>
      <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor"> 重置 </button>
    </div>
    <div class="note-holder" data-event="foreColor"/>
  </div>
  <div><input type="text" /></div>
</div>'
 `,
                callback: ($dropdown) => {
                    $dropdown.find('.note-holder').each((idx, item) => {
                        const $holder = $(item);
                        $holder.append(ui.palette({
                            colors: context.options.colors,
                            colorsName: context.options.colorsName,
                            eventName: $holder.data('event'),
                            container: context.options.container,
                            tooltip: context.options.tooltip
                        }).render());
                    });
                },
                click: (event) => {
                    const $button = $(event.target);
                    const eventName = $button.data('event');
                    const value = $button.data('value');

                    if (eventName && value) {
                        const key = eventName === 'backColor' ? 'background-color' : 'color';
                        const $color = $button.closest('.note-color').find('.note-recent-color');
                        const $currentButton = $button.closest('.note-color').find('.note-current-color-button');

                        $color.css(key, value);
                        $currentButton.attr('data-' + eventName, value);
                        context.invoke('editor.' + eventName, value);
                    }
                }
            })
        ]
    }).render();
};

export default {
    data() {
        return {
            editor: ''
        };
    },
    mounted() {
        this.editor = $(this.$refs.editor);
        this.editor.summernote({
            height: 300,
            buttons: {
                hello: HelloButton,
                drop: DropDownButton,
                kuickColor: KuickColorButton
            },
            toolbar: [
            // [groupName, [list of button]]
                ['edit', ['undo', 'redo']],
                ['fontsize', ['fontsize']],
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['help', ['help']],
                // ['custom', ['hello']],
                // ['drop', ['drop']]
                ['color', ['kuickColor']]
            ]
        }).summernote('justifyLeft');
        this.editor.on('summernote.blur', () => {
            // $(this.$refs.editor).summernote('saveRange');
            console.log('blur');
        });
        console.log(this.editor.find('.note-editable'), 'edit');
        this.editor.parent().find('.note-editable').on('keyup mouseup', () => {
            this.editor.summernote('saveRange');
            console.log('mouseup');
        });
    },
    methods: {
        save() {
            this.editor.summernote('saveRange');
            console.log('save');
        },
        restore() {
            this.editor.summernote('restoreRange');
            console.log('restore');
        },
        insert() {
            var node = document.createElement('div');
            node.innerHTML = '<div>我是我的我我我</div>';
            this.editor.summernote('restoreRange');
            this.editor.summernote('insertNode', node);
            console.log('insert');
        }
    }
};
</script>
<style scoped>
.editor-wrapper {
  width: 80%;
  margin: 0 auto;
}

</style>
