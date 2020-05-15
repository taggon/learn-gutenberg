import React from 'react';
import { Popover, SlotFillProvider } from '@wordpress/components';
import { useEffect, useState, render } from '@wordpress/element';
import {
    BlockEditorProvider,
    BlockList,
    BlockInspector,
    WritingFlow,
    ObserveTyping,
} from '@wordpress/block-editor';
import { registerCoreBlocks } from '@wordpress/block-library';
import '@wordpress/format-library';
import '../shared/base.scss';

const App: React.FC = () => {
    const [ blocks, updateBlocks ] = useState( [] );

    useEffect( () => {
        registerCoreBlocks();
    }, [] );

    return (
        <SlotFillProvider>
            <BlockEditorProvider
                value={ blocks }
                onInput={ updateBlocks }
                onChange={ updateBlocks }
            >
                <div className="editor-sidebar">
                    <BlockInspector />
                </div>
                <div className="editor-styles-wrapper">
                    <Popover.Slot name="block-toolbar" />
                    <WritingFlow>
                        <ObserveTyping>
                            <BlockList />
                        </ObserveTyping>
                    </WritingFlow>
                </div>
            </BlockEditorProvider>
        </SlotFillProvider>
    );
};

render( <App />, document.querySelector('#editor') );