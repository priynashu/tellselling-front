import React, { Component } from 'react'
import grapesjs from 'grapesjs'
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsTemplateManager from "grapesjs-template-manager"
import "grapesjs-template-manager/dist/grapesjs-template-manager.min.css"
import './PageEditor.css'
import { Button } from 'react-bootstrap'
export class PageEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: '<h1>This is Page 1</h1>'
        }
    }
    componentDidMount() {
        const editor = grapesjs.init({
            container: "#editor",
            plugins: [gjsPresetWebpage, gjsTemplateManager],
            pluginsOpts: {
                gjsPresetWebpage: {},
                gjsTemplateManager: {}
            },
            pageManager: true,
            fromElement: true,
        });

        const pn = editor.Panels;
        pn.addButton('options', {
            id: 'open-templates',
            className: 'fa fa-folder-o',
            attributes: {
                title: 'Open projects and templates'
            },
            command: 'open-templates', //Open modal 
        });
        pn.addButton('views', {
            id: 'open-pages',
            className: 'fa fa-file-o',
            attributes: {
                title: 'Take Screenshot'
            },
            command: 'open-pages',
            togglable: false
        });

    }
    ChangePage(editor) {
        this.setState({ page: '<h1>This is Page2</h1>' })
        editor.setComponents(this.state.page);
    }
    render() {
        return (
            <div className='App'>
                <div id='editor'></div>
            </div>
        )
    }
}
export default PageEditor;
