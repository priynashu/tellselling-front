import { useState, useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getLocalUser } from '../../../utils/GetLocalUser';
import axios from 'axios';
import styles from './salescontent.module.scss';
import ReactTagInput from '@pathofdev/react-tag-input';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SectionWiseContents from './SectionWiseContents';
import { backend_url } from '../../../utils/Config';

const contentArea = ['All sales content', 'No sales content'];

const SalesContent = () => {

  const localUser = getLocalUser();
  const [filterTopics, setFilterTopics] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [contentValue, setContentValue] = useState('All sales content');

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [contents, updateContents] = useState([]);

  useEffect(() => { 
    fetchTags();
    fetchCategories();
    // eslint-disable-next-line
  }, [selectedCategories,contents]);

  const fetchTags = async () => {
    try {
      const tenantId = localUser.tenantId;
      const res = await axios.get(backend_url+'resources/tags/'+tenantId);
      setTagsList(res.data.tags);
    } catch (error) {
      console.log(error.data);
    }
  };

  const fetchCategories = async () => {
    try {
      const tenantId = localUser.tenantId;
      const res = await axios.get(backend_url+'resources/categories/'+tenantId);
      setFilterTopics(res.data.categories);
    } catch (error) {
      console.log(error.data);
    }
  };


  /**
   * @name SelectCategories
   */
  const SelectCategory = (category) => {

    //temp selected category list
    const updatedCategories = selectedCategories;

    //check if selected category already exists
    if (updatedCategories.includes(category)) {
      //if category already exists on the selected list - remove  
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      //if category does not exists on the selected list - add
      updatedCategories.push(category);
    }

    //update selectedCategoryList with the temp data
    setSelectedCategories(updatedCategories);

  }

  /**
   * @name SelectTag
   */
  const SelectTag = (tag) => {

    //temp selected tag list
    const updatedTags = selectedTags;

    //check if selected tag already exists
    if (updatedTags.includes(tag)) {
      //if tag already exists on the selected list - remove  
      updatedTags.splice(updatedTags.indexOf(tag), 1);
    } else {
      //if tag does not exists on the selected list - add
      updatedTags.push(tag);
    }

    //update selectedTagList with the temp data
    setSelectedTags(updatedTags);

    console.log(selectedTags);

  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h3 className={styles.title}>Sales Content</h3>
        <div className={styles.header_buttons}>
          <Button variant='outlined'>Upload Content</Button>
          {/* <button>upload content</button>
          <button>request reference</button> */}
        </div>
      </div> 

      <div className={styles.filter_div}>
        <p className={styles.filter_by}>Filter by</p>
        {filterTopics?.map((topic) => {

          return (
            <p onClick={() => { SelectCategory(topic); }}
              className={styles.filter_category}
              key={topic}>
              + {topic}
            </p>
          );
        })}
      </div>
      
      <div className={styles.input_fields}>
        <TextField
          variant='outlined'
          fullWidth
          size='small'
          label='Search'
          placeholder='Search by content name, description, subcategory or owner'
        />
        <div className={styles.content_area_tags}>
          <TextField
            select
            size='small'
            className={styles.content_area}
            label='Content area'
            value={contentValue}
          >
            {contentArea.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <div className={styles.tags_search_div}>
            <ReactTagInput
              tags={selectedTags}
              removeOnBackspace={true}
              onChange={(tag) => { SelectTag(tag) }}
              variant='outlined' size='small' label='Tags' fullWidth
            />
            <div className={styles.all_tags}>
              {tagsList?.map((tag) => (
                <p className={styles.tag} onClick={() => { SelectTag(tag) }} key={tag}>
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SectionWiseContents contents={contents}/>
      <div className={styles.section} style={{ border: 'none', marginTop: '10', cursor: 'pointer', marginBottom: 30 }}>
        <NewSection contents={contents} updateContents={updateContents} />
      </div>  

    </div>
  );
};



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 2,
};

const NewSection = ({ contents, updateContents }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sectionName, setSectionName] = React.useState('');
  const [TempContents, setTempContents] = useState(contents);
  const handleInput = (e) => {
    setSectionName(e.target.value);
  }

  const submitInput = () => {
    const section = {
      "section_name": sectionName,
      "contents": []
    }
    TempContents.push(section);
    updateContents(TempContents);
    setTempContents(TempContents);
    console.log(TempContents);
    setSectionName('');
    handleClose();
  }

  return (
    <>
      <b style={{color:'#7d7d7e',fontSize:'15px'}} onClick={handleOpen}>+ Create Content Section</b>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        style={{ border: 'none' }}
        aria-describedby="modal-modal-description">
        <Box sx={style} style={{ border: 'none' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new Section
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField type='text' onChange={handleInput} style={{ width: '100%', marginTop: '15', marginBottom: '10' }} placeholder='Enter Section Name' />
            <Button style={{ marginTop: 10, marginRight: 10 }} onClick={submitInput} variant="contained">
              Insert
            </Button>
            <Button style={{ marginTop: 10, marginRight: 10 }} onClick={handleClose} variant="outlined">
              Dismiss
            </Button>
          </div>

        </Box>
      </Modal>
    </>
  );
}


const VideoCard = () => {
  return (
    <div className={styles.card}>
      <p className={styles.video_title}>Nicole Pezent</p>
      <p className={styles.video_des}>YCombinator</p>
      <img src='https://i.imgur.com/eqs8ybV.png' alt='VideoImage' />
    </div>
  );
};



export { SalesContent };
