import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import { getLocalUser } from '../../../utils/GetLocalUser';
import axios from 'axios';

// import { BsShareFill } from 'react-icons/bs';
import styles from './salescontent.module.scss';
import { backend_url } from '../../../utils/Config';

// const filterTopics = [
//   'Deal Stages',
//   'Economic Buyer',
//   'Industries',
//   'Products',
//   'Trritory',
//   'Countries',
//   'Real Estate',
// ];

const contentArea = ['All sales content', 'No sales content'];

// const tagsList = ['Commercial Broker', 'Discovery', 'Video', 'Audio', 'Rev.com'];

class SalesContent extends React.Component {
    render() {
        const localUser = getLocalUser();
        const [filterTopics, setFilterTopics] = useState([]);
        const [tagsList, setTagsList] = useState([]);
        const [contentValue, setContentValue] = useState('All sales content');

        const [selectedCategories, setSelectedCategories] = useState([]);
        const [selectedTags, setSelectedTags] = useState([]);

        useEffect(() => {
            fetchTags();
            fetchCategories();
            // eslint-disable-next-line
        }, []);

        const VideoCard = () => {
            return (
                <div className={styles.card}>
                    <p className={styles.video_title}>Nicole Pezent</p>
                    <p className={styles.video_des}>YCombinator</p>
                    <img src='https://i.imgur.com/eqs8ybV.png' alt='VideoImage' />
                </div>
            );
        };

        const fetchTags = async () => {
            try {
                const tenantId = localUser.tenantId;
                const res = await axios.get(backend_url+`resources/tags/${tenantId}`);
                setTagsList(res.data.tags);
            } catch (error) {
                console.log(error.data);
            }
        };

        const fetchCategories = async () => {
            try {
                const tenantId = localUser.tenantId;
                const res = await axios.get(backend_url+`resources/categories/${tenantId}`);
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

            console.log(selectedCategories);
        }

        const handleChange = (event) => {
            setContentValue(event.target.value);
        };

        const selectedStyle = {
            backgroundColor: 'green',
            color: 'white',
            padding: '2px 5px',
            border: '1.5px solid green',
            borderRadius: '50px',
            cursor: 'pointer'
        };

        return (
            <div className={styles.main}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Sales Content</h2>
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
                            <p onClick={() => { SelectCategory(topic); }} style={(selectedCategories.includes(topic)) ? {
                                backgroundColor: 'green',
                                color: 'white',
                                padding: '2px 5px',
                                border: '1.5px solid green',
                                borderRadius: '50px',
                                cursor: 'pointer'
                            } : {
                                backgroundColor: 'white',
                                color: 'black',
                                padding: '2px 5px',
                                border: '1.5px solid black',
                                borderRadius: '50px',
                                cursor: 'pointer'
                            }} className={styles.filter_category} key={topic}>
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
                            onChange={handleChange}
                        >
                            {contentArea.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div className={styles.tags_search_div}>
                            <TextField variant='outlined' size='small' label='Tags' fullWidth />
                            <div className={styles.all_tags}>
                                {tagsList?.map((tag) => (
                                    <p className={styles.tag} key={tag}>
                                        {tag}
                                    </p>
                                ))}
                                {/* <p className={styles.tag_number}>+ 32</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.customer_references}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                        >
                            <Typography variant='body1'>Customer References</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion_details}>
                            <Typography>How are you using Referenceable at your company?</Typography>
                            <div className={styles.videos}>
                                <VideoCard />
                                <VideoCard />
                                <VideoCard />
                                <VideoCard />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
                {/* <div className={styles.button}>
        <BsShareFill color='white' />
        share content
      </div> */}
            </div>
        );
    };


}

export { SalesContent };
