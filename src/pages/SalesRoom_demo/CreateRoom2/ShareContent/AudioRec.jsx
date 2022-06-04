import React, { Component } from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { BsFillRecordCircleFill, BsStopCircle } from 'react-icons/bs';

export class AudioRec extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recordState: null,
            audioModal: false,
            stat:'init'
        }
    }

    start = () => {
        this.setState({
            recordState: RecordState.START,
            stat:'started'
        })
    }

    stop = () => {
        this.setState({
            recordState: RecordState.STOP,
            stat:'stopped'
        })
    }

    //audioData contains blob and blobUrl
    onStop = (audioData) => {
        console.log('audioData', audioData)
    }

    render() {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            p: 2,
        };
        const { recordState } = this.state
        const set_rec_modal = (res) => {
            this.setState({ audioModal: res })
        }
        const handleAudioOpen = () => set_rec_modal(true);;
        const handleAudioClose = () => set_rec_modal(false);
        return (
            <div>

                <center style={{ paddingTop: '15px' }} onClick={() => { handleAudioOpen(); this.setState({stat:'init'}) }}>
                    <KeyboardVoiceIcon style={{ color: '#4d90fe' }} />
                    <p style={{ color: '#4d90fe', fontSize: '12px' }}>RECORD AUDIO</p>
                </center>
                <Modal
                    open={this.state.audioModal}
                    aria-labelledby="modal-modal-title"
                    style={{ border: 'none' }}
                    disableBackdropClick
                    aria-describedby="modal-modal-description">
                    <Box sx={style} style={{ border: 'none' }}>
                        <div>
                            <h5 style={{ float: 'left' }}>Audio Record</h5>
                            <small style={{ float: 'right', color: 'grey', marginBottom: '8px', cursor: 'pointer' }} onClick={() => { handleAudioClose(); this.setState({stat:'init'}); }}>Close</small>
                            <AudioReactRecorder state={recordState} backgroundColor='#ffffff' canvasWidth='560' onStop={this.onStop} />
                            <center>
                            {
                                (this.state.stat=="init" || this.state.stat=="stopped") ? <Button variant="outlined" color="error" startIcon={<BsFillRecordCircleFill />} onClick={() => { this.start(); this.setState('started') }}>Start recording</Button> : <Button variant="outlined" color="error" startIcon={<BsFillRecordCircleFill />} onClick={() => { this.stop(); this.setState('stopped') }}>Stop recording</Button>
                            }
                            
                            </center>
                        </div>
                    </Box>
                </Modal>
            </div>
        )
    }
}

export default AudioRec
