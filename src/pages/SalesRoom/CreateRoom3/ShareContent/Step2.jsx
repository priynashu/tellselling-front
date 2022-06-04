import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import styles from './sharecontent.module.scss';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ListGroup } from 'react-bootstrap';

import VideocamIcon from '@mui/icons-material/Videocam';
import MessageIcon from '@mui/icons-material/Message';
import PublishIcon from '@mui/icons-material/Publish';
import { useRecordWebcam, CAMERA_STATUS } from 'react-record-webcam'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { BsFillRecordCircleFill, BsStopCircle, BsFillCheckCircleFill } from 'react-icons/bs';
import AudioRec from './AudioRec';
import axios from 'axios'
import SalesActions from './SalesActions';
import CircularProgress from '@mui/material/CircularProgress';
const Step2 = ({ ChangeScreen, UpdateWelcomeMessage, WelcomeMessage, SetCTA, CTA }) => {
  const [video, setVideo] = useState(WelcomeMessage.url);
  const [isLoading,setLoading] = useState(false)
  //Stylesheet for New Section Creation Modal
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

  const [new_section_modal, set_new_section_modal] = useState(false);
  const handleOpen = () => set_new_section_modal(true);
  const handleClose = () => set_new_section_modal(false);

  const handleSetVideo = (e) => {
    setLoading(true)
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      //upload to cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "ce0qpcmg");
      axios.post("https://api.cloudinary.com/v1_1/tellselling/video/upload", formData).then((res) => {
        const url = res.data.url;
        console.log(url);
        setVideo(url);
        //handleVideoClose();
        handleClose();
        const welcome_message = {
          type: "video",
          url: url
        };
        console.log("inside welcome msg",welcome_message);
        setLoading(false)
        UpdateWelcomeMessage(welcome_message);
      });
      //const reader = new FileReader();
      //reader.readAsDataURL(selectedFile);
      //reader.onloadend = () => setVideo(reader.result);
      //handleClose();
    }
  };

  const VideoRec = () => {

    const recordWebcam = useRecordWebcam();
    const [stat, setStat] = useState('init');
    const saveFile = async () => {
      const blob = await recordWebcam.getRecording();
      const video = new File(
        [blob],
        "demo.mp4",
        { type: 'video/mp4' }
      );
      const formData = new FormData();
      formData.append("file", video);
      formData.append("upload_preset", "ce0qpcmg");
      axios.post("https://api.cloudinary.com/v1_1/tellselling/video/upload", formData).then((res) => {
        const url = res.data.url;
        setVideo(url);
        handleVideoClose();
        handleClose();
        const welcome_message = {
          type: "video",
          url: url
        };
        UpdateWelcomeMessage(welcome_message);
      });
    };

    const [video_rec_modal, set_rec_modal] = useState(false);
    const handleVideoOpen = () => { set_rec_modal(true); };
    const handleVideoClose = () => set_rec_modal(false);
    const RecDone = () => {
      return (
        <>
          <Button variant="outlined" style={{ marginRight: '10px' }} color="error" startIcon={<BsFillRecordCircleFill />} onClick={() => { recordWebcam.retake(); setStat('rec_started') }}>Retake recording</Button>
          {/*<button onClick={recordWebcam.download}>Download recording</button>*/}
          <Button variant="outlined" style={{ marginLeft: '10px' }} color="success" startIcon={<BsFillCheckCircleFill />} onClick={saveFile}>Confirm</Button>
        </>
      );
    }
    return (
      <>
        <center style={{ paddingTop: '15px' }} onClick={() => { handleVideoOpen(); recordWebcam.open() }}>
          <VideocamIcon style={{ color: '#4d90fe' }} />
          <p style={{ color: '#4d90fe', fontSize: '12px' }}>RECORD VIDEO</p>
        </center>
        <Modal
          open={video_rec_modal}
          aria-labelledby="modal-modal-title"
          style={{ border: 'none' }}
          disableBackdropClick
          aria-describedby="modal-modal-description">
          <Box sx={style} style={{ border: 'none' }}>
            <div>
              <h5 style={{ float: 'left' }}>Video Record</h5>
              <small style={{ float: 'right', color: 'grey', marginBottom: '8px', cursor: 'pointer' }} onClick={() => { recordWebcam.close(); handleVideoClose(); setStat('init') }}>Close</small>
              <video ref={recordWebcam.webcamRef} style={(stat == 'rec_finished') ? { display: 'none' } : { width: '100%' }} autoPlay muted />
              <video ref={recordWebcam.previewRef} style={(stat == 'rec_started' || stat == 'init') ? { display: 'none' } : { width: '100%' }} autoPlay controls loop />
              <center>
                {(stat == "init") ? <Button variant="outlined" color="error" startIcon={<BsFillRecordCircleFill />} onClick={() => { recordWebcam.start(); setStat('rec_started') }}>Start recording</Button> : <></>}
                {(stat == "rec_started") ? <Button variant="outlined" color="error" startIcon={<BsStopCircle />} onClick={() => { recordWebcam.stop(); setStat('rec_finished'); }}>Stop recording</Button> : <></>}
                {(stat == "rec_finished") ? <RecDone /> : <></>}
              </center>
            </div>
          </Box>
        </Modal>
      </>
    )
  }

  const UploadButton = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <>
        <Button variant='outlined' onClick={handleOpen} fullWidth component='span'>
          Upload Welcome Message
        </Button>
        <Modal
          open={new_section_modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          style={{ border: 'none' }}
          aria-describedby="modal-modal-description">
          <Box sx={style} style={{ border: 'none' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ borderBottom: '1px solid #f1f1f1' }}>
              Welcome message
            </Typography>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                      <Tab icon={<VideocamIcon />} label={<span style={{ color: '#000000', fontSize: '10px' }}>Audio or video</span>} value="1" />
                      <Tab icon={<MessageIcon />} label={<span style={{ color: '#000000', fontSize: '10px' }}>Text</span>} value="2" />
                      {isLoading?(<CircularProgress style={{float:"right",marginTop:"15px"}}/>):(<CircularProgress style={{display:"none"}}/>)}
                    </TabList>
                    
                  </Box>
                  <TabPanel value="1">
                    <Box sx={{ width: '100%' }}>
                      <Grid container>
                        <Grid item xs={4} style={{ padding: 5 }}>
                          <div style={{ padding: '10px', border: '1px solid #4d90fe', cursor: 'pointer', alignItems: 'center', borderRadius: '5px' }} centered>
                            <AudioRec />
                          </div>
                        </Grid>
                        <Grid item xs={4} style={{ padding: 5 }}>
                          <div style={{ padding: '10px', border: '1px solid #4d90fe', cursor: 'pointer', alignItems: 'center', borderRadius: '5px' }} centered>
                            <VideoRec onClick={handleClose} />
                          </div>
                        </Grid>
                        <Grid item xs={4} style={{ padding: 5 }}>
                          <div style={{ padding: '10px', border: '1px solid #4d90fe', cursor: 'pointer', alignItems: 'center', borderRadius: '5px' }} centered>
                            <center style={{ paddingTop: '15px' }} onClick={() => { document.getElementById('upload-video').click(); }}>
                              <PublishIcon style={{ color: '#4d90fe' }} />
                              <p style={{ color: '#4d90fe', fontSize: '12px' }}>UPLOAD VIDEO</p>
                            </center>
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <CKEditor
                      editor={ClassicEditor}
                      data=""
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                      }}
                      onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                      }}
                    />
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </Box>
        </Modal>
      </>
    )
  }
  const UpdateCTA = (cta) =>{
    SetCTA(cta);
  }
  return (
    <>
      <div className={styles.text_wrapper}>
        <div className={styles.stepper}>1 / 2</div>
        <h3 className={styles.text_wrapper_text}>Select and order content</h3>
      </div>
      <div>
        <p style={{ fontWeight: 600, marginBottom: '10px', fontSize: '1.1em' }}>Welcome Message</p>
        <label htmlFor='upload-file'>
          <Input
            accept='video/*'
            id='upload-video'
            multiple={false}
            type='file'
            style={{ display: 'none' }}
            onChange={handleSetVideo}
          />

          <UploadButton />
        </label>

        {video && (
          <video controls style={{ marginTop: '10px', width: '100%', height: 'auto' }}>
            <source src={video} type='video/webm' />
          </video>
        )}

        <p style={{ fontWeight: 600, marginTop: '35px', fontSize: '1.1em' }}>Sales actions</p>
        <SalesActions UpdateCTA={UpdateCTA} CTA={CTA}/>

        <div style={{ float: 'right', marginTop: '30px' }}>
          <Button onClick={() => { ChangeScreen(1); }} variant='contained' color='success'>
            Back
          </Button>
        </div>
      </div>
    </>
  );
};

const Input = styled('input')({
  display: 'none',
});

export { Step2 };
